from pathlib import Path
import subprocess
import traceback


def write_failure(message: str) -> None:
    Path('.cb3-run-error.log').write_text(message, encoding='utf-8')


def extract_commands(path: str):
    lines = Path(path).read_text(encoding='utf-8').splitlines()
    commands = []
    current_shell = 'bash'
    index = 0
    while index < len(lines):
        stripped = lines[index].strip()
        if stripped.startswith('shell:'):
            current_shell = stripped.split(':', 1)[1].strip()
        if stripped == 'run: |':
            indent = len(lines[index]) - len(lines[index].lstrip())
            block = []
            index += 1
            while index < len(lines):
                raw = lines[index]
                raw_indent = len(raw) - len(raw.lstrip())
                if raw.strip() and raw_indent <= indent:
                    index -= 1
                    break
                block.append(raw[indent + 2:] if len(raw) >= indent + 2 else '')
                index += 1
            commands.append((current_shell, '\n'.join(block)))
            current_shell = 'bash'
        index += 1
    return commands


def main() -> None:
    commands = extract_commands('.github/workflows/cb3-build-packet.yml')
    if len(commands) != 4:
        raise RuntimeError(f'Expected 4 packet run blocks, found {len(commands)}')

    for index, (shell, command) in enumerate(commands, 1):
        print(f'Executing packet block {index}/4 via {shell}', flush=True)
        argv = ['python', '-c', command] if shell == 'python' else ['bash', '-lc', command]
        result = subprocess.run(argv, text=True, capture_output=True)
        print(result.stdout, end='')
        print(result.stderr, end='')
        if result.returncode:
            raise RuntimeError(
                f'Block {index} via {shell} failed with {result.returncode}\n\n'
                f'STDOUT\n{result.stdout}\n\nSTDERR\n{result.stderr}'
            )


if __name__ == '__main__':
    try:
        main()
    except Exception:
        detail = traceback.format_exc()
        print(detail)
        write_failure(detail)
        raise

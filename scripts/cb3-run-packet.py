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


def normalize_authoring_command(command: str) -> str:
    start = command.find('ci = replace_once(')
    end_marker = 'write(".github/workflows/ci.yml", ci)'
    end = command.find(end_marker, start)
    if start < 0 or end < 0:
        raise RuntimeError('Could not locate CI replacement block in packet authoring command')
    robust = '''marker = "      - name: Sentence lesson contrast browser fixtures\\n        run: node scripts/test-sentence-lesson-contrasts-browser.mjs"
replacement = marker + "\\n      - name: Check CB3 lesson contrast freshness\\n        run: node scripts/build-sentence-lesson-contrasts-sections-5-8.mjs --check\\n      - name: Audit CB3 lesson contrast coverage and safety\\n        run: node scripts/audit-sentence-lesson-contrasts-sections-5-8.mjs\\n      - name: Sentence lesson contrast browser fixtures sections 5-8\\n        run: node scripts/test-sentence-lesson-contrasts-browser-sections-5-8.mjs"
if replacement not in ci:
    if marker not in ci:
        raise SystemExit("Missing CI CB2 browser marker")
    ci = ci.replace(marker, replacement, 1)
'''
    return command[:start] + robust + command[end:]


def main() -> None:
    multiline = extract_commands('.github/workflows/cb3-build-packet.yml')
    if len(multiline) != 3:
        raise RuntimeError(f'Expected 3 multiline packet commands, found {len(multiline)}')

    commit_command = '\n'.join(
        line for line in multiline[2][1].splitlines()
        if '.github/workflows/ci.yml' not in line
    )
    commands = [
        ('python', normalize_authoring_command(multiline[0][1])),
        ('bash', 'node scripts/build-sentence-lesson-contrasts-sections-5-8.mjs --write'),
        multiline[1],
        ('bash', commit_command),
    ]

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

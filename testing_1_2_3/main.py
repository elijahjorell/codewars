# https://www.codewars.com/kata/54bf85e3d5b56c7a05000cf9

lines = ["a", "b", "c"]

def number(lines):
    return [f'{i}: {x}' for i, x in enumerate(lines, 1)]

print(number(lines))
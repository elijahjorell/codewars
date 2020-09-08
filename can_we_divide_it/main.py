# https://www.codewars.com/kata/5a2b703dc5e2845c0900005a

number = -12
a = 2
b = -6

def is_divide_by(number, a, b):
    return True if number % a == 0 and number % b == 0 else False

print(is_divide_by(number, a, b))
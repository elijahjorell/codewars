# https://www.codewars.com/kata/563e320cee5dddcf77000158

import math

marks = [1, 5, 87, 45, 8, 8]

def get_mean(marks):
    return math.floor(sum(marks)/len(marks))

print(get_mean(marks))
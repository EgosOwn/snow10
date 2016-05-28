#!/usr/bin/python3

import binascii

import cgi
import cgitb; cgitb.enable() # Optional; for debugging only
import sys
arguments = cgi.FieldStorage()

# echo headers, additional line-break nessasary.
print("content-type: text/plain")
print("")

# get if request is to encode or decode
choice = arguments['choice'].value

if choice == "1":

    # Encode to whitespace
    
    orig = arguments['text'].value
    
    binary = bin(int.from_bytes(orig.encode(), 'big'))
    
    binary = binary.replace("0", " ").replace("1", "\t")
    
    print(binary[2:])
    
elif choice == "2":

    # Decode to the aes text
    
    binary = " b" + arguments['text'].value
    
    binary = binary.replace("\t", "1").replace(" ", "0")

    
    n = int(binary, 2)
    
    print(n.to_bytes((n.bit_length() + 7) // 8, 'big').decode())

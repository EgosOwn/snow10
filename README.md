# Snow10

Obfuscate &amp; Text as White-Space

Demo: [https://ChaosWebs.net/snow10](https://chaoswebs.net/snow10/)

![snow image](snow.jpg)

**Warning**: The cryptography library Snow10 uses a poor way of generating keys from a password. I will fix this in the future, but it should be "good enough" if you use a highly random password. In general I recommend using PGP instead for the encryption portion for now.

# About

Snow10 is a web app inspired by the [original snow program](http://darkside.com.au/snow/) to use whitespace/zero-width characters to obfuscate messages within the whitespace of other content.

# License

GLPv3, see license file

# Warnings

* No steganography is perfect, your message may be discovered especially by skilled adversaries.
* Some text editors (like vim) show zero width characters
* Some clients/places may strip whitespace characters
* Use encryption if you really need to protect your messages. Use a good password but keep in mind that no encryption is perfect (Snow2 uses cryptojs AES), see the notice at the top of this readme.
* It is best to save the site offline to avoid your messages being intercepted by possible malicious code sent from (my) web server
* The larger your message, the more obvious it is that it is there.
* While Snow10 technically has no size limit for messages, very large messages may take a long amount of time to create. Your browser may appear to freeze if you do this, but it should finish eventually.

# Roadmap (to do)

* Ability to automatically spread/retrieve message content into paragraphs of "cover" text

* Optimize the conversion code for longer messages

* CLI version

* Android app

# Contributing

Feel free to make a pull request if you feel that you have improved the software.

import nltk
#nltk.download('popular') -- only need to do this once
x = '''I am using google translate api to translate some text.

The package is from deep_translator import GoogleTranslator.

However, every time it would return the error: --> text must be a valid text with maximum 5000 character, otherwise it cannot be translated

Does anyone know how to solve this? Is it possible to have a paid version of api to expand the maximum characters?

Thanks a lot!'''

x = nltk.tokenize.sent_tokenize(x)
for sentence in x:
    print(sentence) #send each sentence to translator

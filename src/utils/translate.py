from deep_translator import GoogleTranslator
import os
from time import sleep


fichiers=os.listdir('/home/chabi/Documents/Code/novel-translation/backend/src/public/novels/Keyboard Immortal')
i=0
for l in fichiers:
    try :
        print(i)
        f = open('/home/chabi/Documents/Code/novel-translation/backend/src/public/novels/Keyboard Immortal/'+l,'r+')
        text=str(f.read()).strip()
        print(text)
        translated = GoogleTranslator(source='auto', target='fr').translate(text=text) 
        #print(translated)
        fi= open('/home/chabi/Documents/Code/novel-translation/backend/src/public/translate/novels/Keyboard Immortal/'+l,'w+')
        fi.write(translated) 
        i+=1
    except:
        print("Connection refused by the server..")
        print("Let me sleep for 5 seconds")
        print("ZZzzzz...")
        sleep(5)
        print("Was a nice sleep, now let me continue...")
        continue

# translated = GoogleTranslator(source='auto', target='fr').translate( str(fs.read()))

# print(translated)


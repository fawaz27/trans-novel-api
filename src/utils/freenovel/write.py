import sys
import os
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from requests import get
from pathlib import Path
from time import sleep
def GetChapterContent(baseUrl,url):
    header = {'User-Agent': 'Mozilla / 5.0 (Linux ; Android 10 ; SM-G980F Build / QP1A.190711.020 ; wv) AppleWebKit / 537.36 (KHTML, comme Gecko) Version / 4.0 Chrome / 78.0.3904.96 Mobile Safari / 537.36 ',
    "Access-Control-Allow-Origin": "*"}
    page = get(baseUrl + url,headers=header).text
    
    soup = BeautifulSoup(page,"html.parser")
    #print(soup.find_all("p"))
    return soup.find_all('p')
    
def GetChapters1(baseUrl,url,limit):
    header = {'User-Agent': 'Mozilla / 5.0 (Linux ; Android 10 ; SM-G980F Build / QP1A.190711.020 ; wv) AppleWebKit / 537.36 (KHTML, comme Gecko) Version / 4.0 Chrome / 78.0.3904.96 Mobile Safari / 537.36 ',
    "Access-Control-Allow-Origin": "*"}
    page = get(baseUrl + url,headers=header).text
    soup = BeautifulSoup(page,"html.parser")
    #print (page)
   
    #print(soup)
    oldchapter= soup.find('div',{'class':'m-newest2'})
    
    result = []
    ChapterLinks = oldchapter.find_all('ul',{'class':'ul-list5'})
    name=soup.find('h1',{'class':'tit'}).string
    image=soup.find('div',{'class':'pic'})
    image=image.img.get('src')
    
    for chapterslink in ChapterLinks:
        ChapterLinks1=chapterslink.find_all('a')
        #print(ChapterLinks1[1])
        i = 0
        for link in ChapterLinks1:
            if i == limit:
                break
            print("Nombre de Chapitre :",i)
            sys.stdout.flush()
            #print(link.get('href'))
            try :
                
                result.append({
                    'titre': link.get('title'),
                    'content': GetChapterContent(baseUrl,link.get('href'))
                })
                #print('Download',link,'complete')
                #print("-------------------------------------------------------------------------------------")
                i+=1
            except:
                print("Connection refused by the server..")
                print("Let me sleep for 5 seconds")
                print("ZZzzzz...")
                sleep(5)
                print("Was a nice sleep, now let me continue...")
                sys.stdout.flush()
                continue
    return [name,image,result]

   
    

    
def saveImg(url,path):
    
    response = get(url)
    name= os.path.basename(urlparse(url).path)
    if response.status_code == 200:
        with open(path+"/"+name, 'wb') as f:
            f.write(response.content)
    else:
        print("image is not save")


    

def WriteinFiles(baseUrl,url,limit):
    
    name,image,novel=GetChapters1(baseUrl,url,limit)
    s=''
    
    path=Path("/home/chabi/Documents/Code/novel-translation/backend/src/public/novels/"+name)
    path.mkdir(parents=True, exist_ok=True)
    #print(type(novel))
    saveImg(image,"/home/chabi/Documents/Code/novel-translation/backend/src/public/novels/"+name)
    for l in novel:
        content=l['content']
        chaptertitre=l['titre']
        s=s+' '+'<h2>'+ chaptertitre +' </h2>'+'\n \n \n'
        for k in content:
            s+=str(k)+'\n \n'
        f = open("/home/chabi/Documents/Code/novel-translation/backend/src/public/novels/"+name+"/"+str(chaptertitre).replace("/","-")+".html",'w+')
        f.write(s)
        f.close()
        s=''
    #print(name)

def  GetChapters2(baseUrl,url,limit_pages,limit):
    print("limit_pages :"+str(limit_pages)+"  limit :"+str(limit))
    i=1
    result=[]
    for i in range(1,limit_pages):
        url1=url+"/"+str(i)+".html"
        print("-------------------------------------------------------------------------")
        print("page :",i)
        # sys.stdout.flush()
        WriteinFiles(baseUrl,url1,limit)
        i+=1
        
GetChapters2(sys.argv[1],"/"+sys.argv[2],int(sys.argv[3]),int(sys.argv[4]))

# sleep(10)


    
    
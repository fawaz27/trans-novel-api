import sys
import os
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from requests import get
from pathlib import Path
from time import sleep

from bs4 import BeautifulSoup


def GetNovelsLatest(baseUrl,url,numberpage=1):
    header = {'User-Agent': 'Mozilla / 5.0 (Linux ; Android 10 ; SM-G980F Build / QP1A.190711.020 ; wv) AppleWebKit / 537.36 (KHTML, comme Gecko) Version / 4.0 Chrome / 78.0.3904.96 Mobile Safari / 537.36 ',
    "Access-Control-Allow-Origin": "*"}
    page = get(baseUrl +'/'+ url+'?page='+str(numberpage),headers=header).text
    
    soup = BeautifulSoup(page,"html.parser")
    list_page = soup.find('div',class_='col-xs-12 col-sm-12 col-md-9 col-truyen-main archive')
    rows = list_page.find_all('div',{'class':'row'})
    
    data =[]
    
    for row in rows:
        image = row.find('img')['src']
        title = (row.find('div',class_='col-xs-7')).find('a').text
        chapter = (row.find('div',class_='col-xs-2 text-info')).find('span').text
        data.append({'image':baseUrl+image,'title':title,'last-chapter':chapter})
    
    print(data[0])

GetNovelsLatest('https://novelfull.com','latest-release-novel',2)
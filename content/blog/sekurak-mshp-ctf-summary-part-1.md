---
author: rafal h
tags:
  - security
  - ctf
  - hackathon
  - development
date: 2022-10-17T12:08:57.731Z
update_date: false
dateModified: 2022-10-17T12:08:57.751Z
title: Sekurak MSHP CTF Summary - Part 1
layout: post
image: /images/security_blog_post.png
hidden: false
comments: true
published: true
---
Recently (15.10-16.10) I took part in the Sekurak Mega Hacking Party CTF contest. For those who did not hear of it, CTF is kind of a security hackathon with pre-prepared tasks in which you have to find a flag within known vulnerabilities. This was the first time I have taken part in such a contest. It was quite interesting! Below you will find the first post in series describing the tasks which I solved or tried to solve ;).

# **d﻿eobf**

So the first task was as follows: 

```
// deobfuscate the code, or call appropriate function after executing it, to get the flag
var _0x553b6f=_0x4c5c;(function(_0x1e3834,_0x3f47f5){var _0x5dc057=_0x4c5c,_0x3162e1=_0x1e3834();while(!![]){try{var _0x4d3ec8=parseInt(_0x5dc057(0xc5,'q)cg'))/0x1+parseInt(_0x5dc057(0xc9,'rLxo'))/0x2*(parseInt(_0x5dc057(0xc8,'Khqd'))/0x3)+-parseInt(_0x5dc057(0xb8,'ucN2'))/0x4*(parseInt(_0x5dc057(0xb7,'g0t9'))/0x5)+-parseInt(_0x5dc057(0xb6,'rW2u'))/0x6+parseInt(_0x5dc057(0xbe,'X0LD'))/0x7+parseInt(_0x5dc057(0xba,'KPPr'))/0x8*(-parseInt(_0x5dc057(0xbf,'9ewY'))/0x9)+parseInt(_0x5dc057(0xbb,'H%x$'))/0xa*(parseInt(_0x5dc057(0xcc,'rNIa'))/0xb);if(_0x4d3ec8===_0x3f47f5)break;else _0x3162e1['push'](_0x3162e1['shift']());}catch(_0x1ec551){_0x3162e1['push'](_0x3162e1['shift']());}}}(_0x4ade,0xade96),[][_0x553b6f(0xbc,'Kmu$')][_0x553b6f(0xc0,'De1O')]=()=>window[_0x553b6f(0xca,'xKir')](_0x553b6f(0xc2,'rW2u')));function _0x4c5c(_0x17c2b0,_0x231ba2){var _0x4adec6=_0x4ade();return _0x4c5c=function(_0x4c5c7a,_0x22dce2){_0x4c5c7a=_0x4c5c7a-0xb6;var _0x3f97df=_0x4adec6[_0x4c5c7a];if(_0x4c5c['KZZRud']===undefined){var _0x39ebb7=function(_0x507494){var _0x54c208='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2eca4b='',_0x180c44='';for(var _0x31cf09=0x0,_0x153548,_0x11dd12,_0x3e2f84=0x0;_0x11dd12=_0x507494['charAt'](_0x3e2f84++);~_0x11dd12&&(_0x153548=_0x31cf09%0x4?_0x153548*0x40+_0x11dd12:_0x11dd12,_0x31cf09++%0x4)?_0x2eca4b+=String['fromCharCode'](0xff&_0x153548>>(-0x2*_0x31cf09&0x6)):0x0){_0x11dd12=_0x54c208['indexOf'](_0x11dd12);}for(var _0x4d8e2b=0x0,_0x4afade=_0x2eca4b['length'];_0x4d8e2b<_0x4afade;_0x4d8e2b++){_0x180c44+='%'+('00'+_0x2eca4b['charCodeAt'](_0x4d8e2b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x180c44);};var _0x40e39c=function(_0x14c145,_0x38c081){var _0x181656=[],_0x3d9ee9=0x0,_0x3afb58,_0x3dd4ab='';_0x14c145=_0x39ebb7(_0x14c145);var _0x31f48b;for(_0x31f48b=0x0;_0x31f48b<0x100;_0x31f48b++){_0x181656[_0x31f48b]=_0x31f48b;}for(_0x31f48b=0x0;_0x31f48b<0x100;_0x31f48b++){_0x3d9ee9=(_0x3d9ee9+_0x181656[_0x31f48b]+_0x38c081['charCodeAt'](_0x31f48b%_0x38c081['length']))%0x100,_0x3afb58=_0x181656[_0x31f48b],_0x181656[_0x31f48b]=_0x181656[_0x3d9ee9],_0x181656[_0x3d9ee9]=_0x3afb58;}_0x31f48b=0x0,_0x3d9ee9=0x0;for(var _0x3b0565=0x0;_0x3b0565<_0x14c145['length'];_0x3b0565++){_0x31f48b=(_0x31f48b+0x1)%0x100,_0x3d9ee9=(_0x3d9ee9+_0x181656[_0x31f48b])%0x100,_0x3afb58=_0x181656[_0x31f48b],_0x181656[_0x31f48b]=_0x181656[_0x3d9ee9],_0x181656[_0x3d9ee9]=_0x3afb58,_0x3dd4ab+=String['fromCharCode'](_0x14c145['charCodeAt'](_0x3b0565)^_0x181656[(_0x181656[_0x31f48b]+_0x181656[_0x3d9ee9])%0x100]);}return _0x3dd4ab;};_0x4c5c['cCKsUi']=_0x40e39c,_0x17c2b0=arguments,_0x4c5c['KZZRud']=!![];}var _0x277549=_0x4adec6[0x0],_0x534e81=_0x4c5c7a+_0x277549,_0x4a09ac=_0x17c2b0[_0x534e81];return!_0x4a09ac?(_0x4c5c['nXMkoz']===undefined&&(_0x4c5c['nXMkoz']=!![]),_0x3f97df=_0x4c5c['cCKsUi'](_0x3f97df,_0x22dce2),_0x17c2b0[_0x534e81]=_0x3f97df):_0x3f97df=_0x4a09ac,_0x3f97df;},_0x4c5c(_0x17c2b0,_0x231ba2);}function _0x4ade(){var _0x2f84c2=['W6FcR8kFaCoHWOv8','x14FoxX0WQ3cVG','WQ4IWQRdIc8UW6CthW','cSoCW4i7t14EWPeKWQKBW6dcMW','vmoVja7cUSo+vb7dGhfRWRK','W6qpbriGWPCga8k9WRBcJrmz','dwvRW4xcHW','DSokWO3dNrekW4/cRa','WRDDWPSZc8oOW6ldV8kJrN1beComsXbiimosW53cHmoEe8kMea','W5/dImo/WPxcUCoxjmo9ehD6Bmou','W6FcU8obWPNdNCkiW7RcKCokE0xcRG','W5ldGSkbAZy/WQvyqrOGW4S','WOJcPaHrW7m/WPRcJIxdUr3dSa','gqrMsCkWWR3cNKyN','W6hdMxxcQ14qW5Pl','jxxcLCk+grNcGsmTW4PlDa','tq/cNWJcTq','cmk+W5hcL8o2WPxcOKtdSLZcSbi','WRDrW4VcImkwbmo2ySolq0ym','W4a7W65uuCkMWRNdGCkguwz6hW','fmo+q8kSW7dcLxdcKea','DmogW5NcUWGEW6/cTZi1','i8kxzmormmkyWRD1'];_0x4ade=function(){return _0x2f84c2;};return _0x4ade();}
```

Instead of deobfuscation which might be too cumbersome, I had formatted the code and looked into it.

After investigation, it looked like this function here could be executed (and this was also indicated in a hint to the task).

<div class="image"><img src="/images/screenshot-2022-10-17-at-14.28.51.png" alt="deobf formatted" title="deobf code formatted"  /> </div>

I﻿ followed to Chrome dev tools and executed code in the console calling a function. Results? 

<div class="image"><img src="/images/screenshot-2022-10-17-at-14.40.10.png" alt="ctf flag" title="ctf flag"/> </div>

I﻿ have the flag!

# **traversal**

S﻿o in next task, we got page like this:

<div class="image"><img src="/images/screencapture-172-105-146-185-1337-2022-10-17-14_52_21.png" alt="traversal page" title="traversal page"  /> </div>

A﻿s you can see, this is web app written in .NET. After clicking on one of the files, I got following view: 

<div class="image"><img src="/images/screenshot-2022-10-17-at-14.52.39.png" alt="cv file" title="cv file"   /> </div>

So it looks like files were referenced by the filename query param.

After looking in the code, it looks like `..` path would throw Bad Request error. I guess this was protection of reusing know payloads for path traversal vulnerability by other contestants :D. Simple change from CV file to flag file given the expected result:

<div class="image"><img src="/images/screenshot-2022-10-17-at-14.52.56.png" alt="traversal-flag" title="traversal-flag"  /> </div>

B﻿ingo! 

F﻿or the next post in series I will present other tasks which I have tried to solve - still, even if not successful, I have learned something valuable :)
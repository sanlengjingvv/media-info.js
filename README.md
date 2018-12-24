# 用 JavaScript 获取 FLV 信息

示例代码在 Mac Chrome 70 上执行

### FLV 官方规格书和一些说明文章

[Video File Format Specification Version 10](https://www.adobe.com/content/dam/acom/en/devnet/flv/video_file_format_spec_v10.pdf)  
[视音频编解码学习工程：FLV封装格式分析器](https://blog.csdn.net/leixiaohua1020/article/details/17934487)  
[一张图看懂FLV文件格式](https://blog.ibaoger.com/2017/06/04/flv-file-format/)
[Action Message Format](https://www.adobe.com/content/dam/acom/en/devnet/pdf/amf0-file-format-specification.pdf)

### JavaScript 操作二进制数据的
[ArrayBuffer 教程](http://es6.ruanyifeng.com/#docs/arraybuffer)  

### 用MediaInfo 查看视频信息
```
brew install media-info
mediainfo example.flv
```

### 用 http-server 作为本地服务器
```
npm install http-server -g
http-server -a 127.0.0.1 -p 9999
```

### 在终端查看二进制表示的文件
```
xxd -b file
```

查看十六进制表示的文件
```
xxd file
```

### ffmpeg 处理文件
```
# 切分
ffmpeg -ss 00:00:00.0 -i origin.flv -c copy -t 00:00:01.0 split.flv
# 转格式
ffmpeg -i video.mp4 -vcodec copy video.flv
# 查看信息
ffmpeg -i example.flv -hide_banner
```

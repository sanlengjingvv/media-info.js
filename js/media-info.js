let parse = chunk => {
    console.log('binary FLV: ', chunk)

    console.log('The FLV header: ')

    console.log('FLV Signature: ')
    console.log(String.fromCharCode(chunk[0]))
    console.log(String.fromCharCode(chunk[1]))
    console.log(String.fromCharCode(chunk[2]))

    console.log('File version: ', chunk[3])

    let flvFlagsString = toBinaryString(chunk.slice(4, 4 + 1))
    console.log('TypeFlagsReserved: ', flvFlagsString.slice(0, 5))
    console.log('TypeFlagsAudio: ', flvFlagsString.charAt(5))
    console.log('TypeFlagsReserved: ', flvFlagsString.charAt(6))
    console.log('TypeFlagsVideo: ', flvFlagsString.charAt(7))

    let dataOffset = new DataView(chunk.slice(5, 5 + 4).buffer).getUint32()
    console.log('DataOffset: ', dataOffset)

    console.log('The FLV file body: ')

    let previousTagSize0 = new DataView(chunk.slice(9, 9 + 4).buffer).getUint32()
    console.log('The first PreviousTagSize: ', previousTagSize0)

    console.log('The first Tag TagType: ', chunk[13])

    let dataSize0 = parseInt(toBinaryString(chunk.slice(14, 14 + 3)), 2)
    console.log('The first Tag DataSize: ', dataSize0)

    console.log('The first Tag Timestamp: ', chunk.slice(17, 17 + 3))
    console.log('The first Tag TimestampExtended: ', chunk[20])

    let streamID0 = chunk.slice(21, 21 + 3)
    console.log('The first Tag StreamID: ', parseInt(toBinaryString(streamID0)))

    let data0 = chunk.slice(24, 24 + dataSize0)
    console.log('The first Tag Data: ', data0)

    let previousTagSize1 = new DataView(chunk.slice(396, 396 + 4).buffer).getUint32()
    console.log('The second PreviousTagSize: ', previousTagSize1)
    console.log('The second PreviousTagSize should equal dataSize0 plus 11: ', previousTagSize1 === dataSize0 + 11)

    console.log('The second Tag TagType: ', chunk[400])

    let dataSize1 = parseInt(toBinaryString(chunk.slice(401, 401 + 3)), 2)
    console.log('The second Tag DataSize: ', dataSize1)

    console.log('The second Tag Timestamp: ', chunk.slice(404, 404 + 3))
    console.log('The second Tag TimestampExtended: ', chunk[407])

    let streamID1 = chunk.slice(408, 408 + 3)
    console.log('The second Tag StreamID: ', parseInt(toBinaryString(streamID1)))

    let data1 = chunk.slice(411, 411 + dataSize1)
    console.log('The second Tag Data: ', data1)

    let previousTagSize2 = new DataView(chunk.slice(460, 460 + 4).buffer).getUint32()
    console.log('The third PreviousTagSize2: ', previousTagSize2)
    console.log('The third PreviousTagSize2 equal dataSize1 plus 11: ', previousTagSize2 === dataSize1 + 11)

    console.log('The third Tag TagType: ', chunk[464])

    let dataSize2 = parseInt(toBinaryString(chunk.slice(465, 465 + 3)), 2)
    console.log('The third Tag DataSize: ', dataSize2)

    console.log('The third Tag Timestamp: ', chunk.slice(468, 468 + 3))
    console.log('The third Tag TimestampExtended: ', chunk[471])

    let streamID2 = chunk.slice(472, 472 + 3)
    console.log('The third Tag StreamID: ', parseInt(toBinaryString(streamID2)))

    let data2 = chunk.slice(475, 475 + dataSize2)
    console.log('The third Tag Data: ', data2)

    let previousTagSize3 = new DataView(chunk.slice(482, 482 + 4).buffer).getUint32()
    console.log('The fourth PreviousTagSize3: ', previousTagSize3)
    console.log('The fourth PreviousTagSize3 equal dataSize2 + 11: ', previousTagSize3 === dataSize2 + 11)

    console.log('The fourth Tag TagType: ', chunk[486])

    let dataSize3 = parseInt(toBinaryString(chunk.slice(487, 487 + 3)), 2)
    console.log('The fourth Tag DataSize: ', dataSize3)

    console.log('The fourth Tag Timestamp: ', chunk.slice(490, 490 + 3))
    console.log('The fourth Tag TimestampExtended: ', chunk[493])

    let streamID3 = chunk.slice(494, 494 + 3)
    console.log('The fourth Tag StreamID: ', parseInt(toBinaryString(streamID3)))

    let data3 = chunk.slice(497, 497 + dataSize3)
    console.log('The fourth Tag Data: ', data3)

    let previousTagSize4 = new DataView(chunk.slice(9059, 9059 + 4).buffer).getUint32()
    console.log('The fifth PreviousTagSize4: ', previousTagSize4)
    console.log('The fifth PreviousTagSize4 equal dataSize3 plus 11: ', previousTagSize4 === dataSize3 + 11)

    console.log('The third Tag is audio tag')
    let audioInfo = toBinaryString(data2.slice(0, 1))
    console.log('audio SoundFormat: ', parseInt(audioInfo.slice(0, 4), 2))
    console.log('audio SoundRate: ', parseInt(audioInfo.slice(4, 6), 2))
    console.log('audio SoundSize: ', parseInt(audioInfo.slice(6, 7), 2))
    console.log('audio SoundType: ', parseInt(audioInfo.slice(7, 8), 2))
    let soundData = data2.slice(1, data2.byteLength)
    console.log('audio SoundData: ', soundData)
    console.log('audio AACPacketType: ', soundData[0])

    console.log('The second Tag is video tag')
    let videoInfo = toBinaryString(data1.slice(0, 1))
    console.log('video FrameType: ', parseInt(videoInfo.slice(0, 4), 2))
    console.log('video CodecID: ', parseInt(videoInfo.slice(4, 8), 2))
    let videoData = data1.slice(1, data1.byteLength)
    console.log('video videoData: ', videoData)
    console.log('video videoData AVCPacketType: ', videoData[0])
    let compositionTime = new Int8Array(videoData.slice(1, 4).buffer)
    console.log('video videoData compositionTime: ', compositionTime)
    console.log('video videoData Data: ', videoData.slice(5, 48))

    console.log('The second Tag is script tag')
    console.log('AMF0 type: ', data0[0])
    let amf0Length = parseInt(toBinaryString(data0.slice(1, 3)), 2)
    console.log('AMF0 length: ', amf0Length)
    let amf0 = data0.slice(3, 3 + amf0Length)
    console.log('AMF0 string: ', arrayToAsciis(amf0))

    console.log('AMF1 type: ', data0[13])
    console.log('AMF1 array length: ', new DataView(data0.slice(14, 18).buffer).getUint32())
    
    let dataView = new DataView(data0.buffer)
    let array0NameLength = dataView.getUint16(18)
    console.log('AMF1 array array0 name length: ', array0NameLength)
    console.log('AMF1 array array0 name: ', arrayToAsciis(data0.slice(20, 20 + array0NameLength)))
    console.log('AMF1 array array0 value type: ', data0[28])
    console.log('AMF1 array array0 value: ', dataView.getFloat64(29))

    let array1NameLength = dataView.getUint16(29 + 8)
    console.log('AMF1 array array1 name length: ', array1NameLength)
    console.log('AMF1 array array1 name: ', arrayToAsciis(data0.slice(37 + 2, 37 + 2 + array1NameLength)))
    console.log('AMF1 array array1 value type: ', data0[44])
    console.log('AMF1 array array1 value: ', dataView.getFloat64(45))

    let array2NameLength = dataView.getUint16(45 + 8)
    console.log('AMF1 array array2 name length: ', array2NameLength)
    console.log('AMF1 array array2 name: ', arrayToAsciis(data0.slice(53 + 2, 53 + 2 + array2NameLength)))
    console.log('AMF1 array array2 value type: ', data0[61])
    console.log('AMF1 array array2 value: ', dataView.getFloat64(62))

    let array3NameLength = dataView.getUint16(62 + 8)
    console.log('AMF1 array array3 name length: ', array3NameLength)
    console.log('AMF1 array array3 name: ', arrayToAsciis(data0.slice(70 + 2, 70 + 2 + array3NameLength)))
    console.log('AMF1 array array3 value type: ', data0[85])
    console.log('AMF1 array array3 value: ', dataView.getFloat64(86))

    let array4NameLength = dataView.getUint16(86 + 8)
    console.log('AMF1 array array4 name length: ', array4NameLength)
    console.log('AMF1 array array4 name: ', arrayToAsciis(data0.slice(94 + 2, 94 + 2 + array4NameLength)))
    console.log('AMF1 array array4 value type: ', data0[105])
    console.log('AMF1 array array4 value: ', dataView.getFloat64(106))

    let array5NameLength = dataView.getUint16(106 + 8)
    console.log('AMF1 array array5 name length: ', array5NameLength)
    console.log('AMF1 array array5 name: ', arrayToAsciis(data0.slice(114 + 2, 114 + 2 + array5NameLength)))
    console.log('AMF1 array array5 value type: ', data0[128])
    console.log('AMF1 array array5 value: ', dataView.getFloat64(129))

    let array6NameLength = dataView.getUint16(129 + 8)
    console.log('AMF1 array array6 name length: ', array6NameLength)
    console.log('AMF1 array array6 name: ', arrayToAsciis(data0.slice(137 + 2, 137 + 2 + array6NameLength)))
    console.log('AMF1 array array6 value type: ', data0[152])
    console.log('AMF1 array array6 value: ', dataView.getFloat64(153))

    let array7NameLength = dataView.getUint16(153 + 8)
    console.log('AMF1 array array7 name length: ', array7NameLength)
    console.log('AMF1 array array7 name: ', arrayToAsciis(data0.slice(161 + 2, 161 + 2 + array7NameLength)))
    console.log('AMF1 array array7 value type: ', data0[178])
    console.log('AMF1 array array7 value: ', dataView.getFloat64(179))

    let array8NameLength = dataView.getUint16(179 + 8)
    console.log('AMF1 array array8 name length: ', array8NameLength)
    console.log('AMF1 array array8 name: ', arrayToAsciis(data0.slice(187 + 2, 187 + 2 + array8NameLength)))
    console.log('AMF1 array array8 value type: ', data0[204])
    console.log('AMF1 array array8 value: ', dataView.getFloat64(205))

    let array9NameLength = dataView.getUint16(205 + 8)
    console.log('AMF1 array array9 name length: ', array9NameLength)
    console.log('AMF1 array array9 name: ', arrayToAsciis(data0.slice(213 + 2, 213 + 2 + array9NameLength)))
    console.log('AMF1 array array9 value type: ', data0[221])
    console.log('AMF1 array array9 value: ', dataView.getUint8(222))

    let array10NameLength = dataView.getUint16(222 + 1)
    console.log('AMF1 array array10 name length: ', array10NameLength)
    console.log('AMF1 array array10 name: ', arrayToAsciis(data0.slice(223 + 2, 223 + 2 + array10NameLength)))
    console.log('AMF1 array array10 value type: ', data0[237])
    console.log('AMF1 array array10 value: ', dataView.getFloat64(238))

    let array11NameLength = dataView.getUint16(238 + 8)
    console.log('AMF1 array array11 name length: ', array11NameLength)
    console.log('AMF1 array array11 name: ', arrayToAsciis(data0.slice(246 + 2, 246 + 2 + array11NameLength)))
    console.log('AMF1 array array11 value type: ', data0[259])
    let array11ValueLength = dataView.getUint16(260)
    console.log('AMF1 array array11 value length: ', array11ValueLength)
    console.log('AMF1 array array11 value: ', arrayToAsciis(data0.slice(260 + 2, 260 + 2 + array11ValueLength)))

    let array12NameLength = dataView.getUint16(260 + 2 + array11ValueLength)
    console.log('AMF1 array array12 name length: ', array12NameLength)
    console.log('AMF1 array array12 name: ', arrayToAsciis(data0.slice(266 + 2, 266 + 2 + array12NameLength)))
    console.log('AMF1 array array12 value type: ', data0[281])
    let array12ValueLength = dataView.getUint16(282)
    console.log('AMF1 array array12 value length: ', array12ValueLength)
    console.log('AMF1 array array12 value: ', arrayToAsciis(data0.slice(282 + 2, 282 + 2 + array12ValueLength)))

    let array13NameLength = dataView.getUint16(282 + 2 + array12ValueLength)
    console.log('AMF1 array array13 name length: ', array13NameLength)
    console.log('AMF1 array array13 name: ', arrayToAsciis(data0.slice(287 + 2, 287 + 2 + array13NameLength)))
    console.log('AMF1 array array13 value type: ', data0[306])
    let array13ValueLength = dataView.getUint16(307)
    console.log('AMF1 array array13 value length: ', array13ValueLength)
    console.log('AMF1 array array13 value: ', arrayToAsciis(data0.slice(307 + 2, 307 + 2 + array13ValueLength)))

    let array14NameLength = dataView.getUint16(307 + 2 + array13ValueLength)
    console.log('AMF1 array array14 name length: ', array14NameLength)
    console.log('AMF1 array array14 name: ', arrayToAsciis(data0.slice(325 + 2, 325 + 2 + array14NameLength)))
    console.log('AMF1 array array14 value type: ', data0[334])
    let array14ValueLength = dataView.getUint16(335)
    console.log('AMF1 array array14 value length: ', array14ValueLength)
    console.log('AMF1 array array14 value: ', arrayToAsciis(data0.slice(335 + 2, 335 + 2 + array14ValueLength)))

    let array15NameLength = dataView.getUint16(335 + 2 + array14ValueLength)
    console.log('AMF1 array array15 name length: ', array15NameLength)
    console.log('AMF1 array array15 name: ', arrayToAsciis(data0.slice(350 + 2, 350 + 2 + array15NameLength)))
    console.log('AMF1 array array15 value type: ', data0[360])
    console.log('AMF1 array array15 value: ', dataView.getFloat64(361))

    console.log('AMF1 array end: ', data0.slice(369,372))

    console.log('The sum of PreviousTagSize should be 26192 - 9: ', sumPreTagSizes(chunk))

}

let arrayToAsciis = array => {
    let asciis = ''
    array.forEach( char => {
        asciis = asciis + String.fromCharCode(char)
     })
     return asciis
}

let toBinaryString = uint8Array => {
    return Array.from(uint8Array, (item) => item.toString(2).padStart(8, '0')).join('')
}

let sumPreTagSizes = chunk => {
    let sum = 0

    let preTagEnd = chunk.length

    while (preTagEnd >= (9 + 4)) {
        let preTag = chunk.slice(preTagEnd - 4, preTagEnd)
        let preTagSize = new DataView(preTag.buffer).getUint32()

        sum = sum + preTagSize
        sum = sum + 4  // PreviousTagSize 本身占 4 字节

        preTagEnd = preTagEnd - 4 - preTagSize
    }

    return sum
}



## 阶段性测试 2019.12.06


1.  列出至少 7 个常用 Linux 命令及其基本使用方法
    1.  + cd
    2.  + echo
    3.  + cat
    4.  + pwd 打印当前目录
    5.  + vi
        1.  esc
        2.  i
        3.  :w
        4.  :q
        5.  :wq
    + mkdir创建文件夹
    + rmdir删除文件夹
    + rm删除文件
    + ls 查看目录文件
    + ls-a 显示所有文件,包括隐藏文件
    + 设置别名 alias lsl='ls -lrt'
    + 显示命令文档信息whatis command
    + touch a.txt 打开a,如果不存在则创建一个a.txt
    + date 显示系统时间
2.  什么是 html 实体？常见 html 实体有哪些？
    + 如<,>,&,",$, 等预留的字符,浏览器会认为它们是标签或者属性,可忽略的值等,不能再HTML中明文出现
    + 用实体名称来表示他们,比如:&nbsp; &lt; &gt; &amp; &quot;
3. 计算机为什么使用二进制？
    + 计算机是由逻辑电路组成，逻辑电路通常只有两个状态，开关的接通与断开,技术实现简单,适合逻辑运算.对应数学中的布尔逻辑
    + 二进制数字信号可以有效地消除误差
    + 二进制足够使用
4. 什么是 Unicode？如何表示，有什么作用？最通用的 Unicode 实现是？
    + 将全球字符统一编码的标准,为每个符号制定了唯一且不重复的编号.
    + ps:U+6211
    + 最广泛的实现:UTF-8(变长编码,保存数据以及长度)
5.  什么是 GUI，什么是 CLI，什么是接口/界面？现实生活中有哪些例子？
    + GUI:图形用户界面.用户界面的所有元素图形化，主要使用鼠标作为输入工具，点击图标执行程序，使用按钮、菜单、对话框等进行交互，追求易用，看起来比较美.例如:Word,excel,PPT,通过按钮等操作的设备
    + CLI:命令行界面.用户界面字符化，使用键盘作为输入工具，输入命令、选项、参数执行程序，追求高效，看起来比较酷.例如:CMD,Linux
    + 接口/界面:interface,利用接口，我们可以对一个封装好的整体进行操作，不仅仅是获取数据
6.  在什么情况下 html 标签可以不需要闭合？
    + 自闭合的标签无需闭合<br><input>
    + 非自闭合标签在一些情况也可以不用闭合,因为他会自动闭合(浏览器可以识别帮你闭合)
7.  在一些情况下某些非自闭合标签的结束标签可以省略的原因是什么？
    + 根据HTML标签分类等规则,某些嵌套方式下,已经可以推导出该标签必须闭合,则不需要人为书写该标签.
8.  什么是费茨定律？它有哪些应用？
    + 交互设计中,目标的可达程度与鼠标和目标的距离成反比,与目标的大小成正比.
    + 任意一点移动到目标中心位置所需时间与该点到目标的距离和大小有关，距离越大时间越长，目标越大时间越短。
    + 增大button可点击区域.鼠标手势.快捷键
9.  为什么英文很重要？
    + 官方文档是英文的,权威书籍是英文,github+stackoverflow需要英文.
    + 报错是英文的,而且没有翻译
10. 将二进制 `10010` 数转换为十进制数
    + 18
11. 将十六进制数 `ABCDEF` 转换为十进制数
    + 11259375
12. 将十进制数 `435` 分别转换成二进制数和十六进制数
    + 二进制:110110011
    + 十六进制:1B3
13. 列出 HTML 中常见的全局属性
    + class:规定元素的一个或多个类名
    + id:规定元素的唯一标识
    + title:规定元素的提示信息
    + hidden:该元素隐藏不显示
    + style:规定元素行内样式
    + lang
    + dir
    + tabindex
14. 什么是操作系统的路径（Path）？它的作用及应用场景是？
    + 操作系统中的一个有序文件夹列表.
    + 作用:当用户在命令行或windows的运行窗口中输入命令时,会按序在路径列表中查找相应的可执行程序来执行.
    + 应用场景:借由运行窗口加快打开软件的速度.
15. 什么是文本文件？什么是二进制文件？它们最明显的区别是？
    + 实际上都是硬盘上的二进制文件.以文本编码方式编码用键盘可以输入的字符,称为文本文件,其他情况称谓二进制文件.
    + 文本文件是基于字符编码的文件，常见的编码有ASCII编码，UNICODE编码等等,存放的字符数据.
    + 二进制文件是基于值编码的文件
    + 文本文件通常是定长编码.二进制基于值编码,多少个比特代表一个值，完全由自己决定.存储数字时,二进制文件更精确,速度更快,更省空间.
16. 为什么说 html 与数学公式有诸多相似之处？
    + 用标签和属性组合,数学公式用数字和运算符组合.标签和相应的属性即得结果.
    + 都是树状结构
    + 数学中括号与HTML中标签的嵌套规则是相同的
17. 几种常见图片格式有什么区别和特点？
    + jpg/jpeg:有损压缩,压缩率很高.以8*8为单位进行压缩,适合保存渐变色的图片-现实照片.
    + png:无损压缩,支持最高256级透明,适合保存大片纯色区域图片,如截图
    + gif:无损压缩,动图,256色内无损压缩,尺寸一般较小
    + bmp:无压缩无损,直接保存原始数据,体积巨大,取决于图片尺寸,不适合放网页里
    + psd:只用于Photoshop.保存了构造这张照片的所有信息.
    + webp:支持透明,有损压缩,各方面优于jpg适合移动端使用
18. `data-*` 属性一般是用来干嘛？
    + 自定义数据属性,可以在HTML元素中嵌入自定义数据属性,存储一些不需要显示在浏览器上的额外信息,可以通过所属元素的HTMLElement接口来访问.CSS可以用attr()来访问.
    + 不会因为标准的改变而产生额外的语义.
19. 用什么方法扩大一个 checkbox 的可点击区域？
    + 为其添加一个label与该input关联,点击label即点击CheckBox,并可以设置label的样式,范围以修改CheckBox可点击区域.
    + 不能用伪元素
20. 什么是 MIME Type？
    + 媒体类型,比文件扩展名更精确明确的文件类型描述.例如:text/html,img/png,audio/*
21. 哪些标签可以使用 target 属性？哪些标签可以使用 href 属性？
    ```
    + <a>,<form>,<area>,<base>可以使用target属性
    + <a>,<link>,<area>,<base>,<meta>可以使用href属性
     ```
22. 什么是 BOM 头？
    + 文本文件头部的字节顺序标记,标记文件编码方式
    + 使用Unicode保存文本文件的三个字节的文件头
    + 直接在记事本编辑数据保存，默认会给你的数据添加上BOM头，使你的文件的大小比实际数据多3个字节（utf-8编码）。
23. group 类型的标签有哪些？
    ```
    + <hgroup>,<optgroup>,<colgroup>,<fieldset>,<ul>,<ol>,<thead>
    ```
24. 什么是 SEO？
    + 搜索引擎优化,针对搜索引擎排序规则对网站进行调整,提高目的网站在搜索引擎内的排名.
25. 分别列出每种常见浏览器的内核名称（自己查）。
    + Chrome - Blink(前内核Webkit)
    + Firefox - Gecko
    + Opera - webkit(前内核:Presto)
    + IE - EDGE (前内核Tridnet)
    + EDGE - Webkit
    + Safari - Webkit
26. 列表类标签有哪些？分别如何使用？需要注意些什么？
    ```
    + <ul>,<li>无序列表,<ul>里面套<li>
    + <ol>,<li>有序列表,<ol>里面套<li>
    + <dl>,<dt>,<dd>自定义列表,项目及其注释的组合,<dl>里面套<dt>里面套<dd>,<dt>定义标题，<dd>定义标题的描述
    ```
27. 为什么不同类型的标签的 fallback 内容要以不同的形式提供？
    ```
    + <a>,<img>等标签用alt属性提供fallback内容
    + <video>,<canvas>,<iframe>在结束标签前填写退化内容,否则fallback与标签脱离
    + <frameset>,<frame>,<script> 在结束标签后用<noframes></noframes>填写退化内容
    + 某些标签在正常使用时,内部有内容,fallback不能放在其内部;而有些标签在正常使用时是空的,相当于替换元素,所以fallback可以写在其内部

28. 分别写出在 head 中设定页面编码，设定 icon，引入样式表的标签
    ```
    + <meta charset="utf-8">
    + <link rel="icon" href="xx.png">
    + <link rel="stylesheet" href="xx.css">
     ```

29. 什么叫做可访问性，html 中为此做了什么工作？
    + 尽可能多的人使用你的网站,考虑用户是否残障,考虑用户访问时的环境限制.比如使用移动设备的人,残疾人,网络连接缓慢的人,考虑他们的需求,提高无障碍访问,让他们都可以顺利地使用你的网站.
    + 对于不同人群是否能正常使用.
    + 在不同设备上是否能正常使用.
    + 对于不同的输入设备是否能正常使用.
    + aria与role属性用来通过浏览器告诉读屏软件当前元素所代表的的常见交互元素如下拉框,选项卡,列表框
    + 表格th标签的id与td标签的headers属性
    + HTML语义化:拥有标题，段落，列表等内容的良好结构。使用通俗易懂的语言,使用正确的标签.为用户提供最好的体验.
30. 写出以下几个符号的 ascii 码：`a，A，0，CR，LF，空格，NBSP`。
    + 十进制:
    + a:97
    + A:65
    + 0:48
    + CR:13
    + LF:10
    + 空格:32
    + NBSP:160
31. 中英互翻
    * geek:极客,对电脑痴迷,善于钻研的人
    * nerd:书呆子,迷恋计算机的呆子
    * hacker:黑客;骇客
    * edge:尖端,边缘
    * bleeding/cutting edge:前沿/尖端/可能存在风险的技术
    * HTML:超文本标记语言  实体:entity
    * coordinate:坐标
    * polygon:多边形
    * bit:比特,表示一个二进制数字:0或1
    * byte:字节,一个字节为8比特,一个英文字符为一个字节
    * alternative:可选的;可替代的选择
    * 属性:attribute
    * obsolete:废弃的
    * 二进制:Binary(BIN)
    * 十进制:Decimal(DEC)
    * 十六进制:hexadecimal(HEX)
    * octal:八进制
    * deprecate:弃用
    * loop:循环
    * 行:row
    * 列:column
    * horizontal:水平的
    * 语义化:Semantic
    * 可访问性:Accessibility


32. 用文字描述如下选择器将选择哪些（个）元素
  ```css
  div, h1 {}:div和h1元素
  div[class] [id="abc"] {}:有class属性的div里面的id="abc"的元素
  div:hover ul li > div {}:鼠标悬浮在div上时,div里面的ul里面的li的子元素div
  body :active {}:body里面的被激活的元素
  div:hover::after {}:鼠标悬浮在div上时,在div后面创建一个after伪元素
  ::selection {}:用鼠标或键盘选中的元素,一般改变颜色
  :target {}:选择一个ID与当前URL片段(#后面的元素)匹配的元素
  input + ul + p ~ span {}选择input后面的ul后面的p后面的所有span元素
  ```

34. 分别写出如下几个选择器的优先级
    ```css
    * * * {}(0,0,0)
    div * span {}(0,0,2)
    div[title] {}(0,1,1)
    fieldset legend + input {}(0,0,3)
    #some #thing .not:hover .abc:hover {}(2,4,0)
    ```

35. `em,px,rem,vw,vh` 分别代表多长？
    + em:当前元素字号的大小;当用在font-size上时,取父元素的字号大小
    + px:像素,与显示设备有关,在设计中大多数被认为是绝对长度
    + rem:根元素的字体大小
    + vw:视口宽度的1/100
    + vh:视口高度的1/100
36. 显示器的物理分辨率为 `1920x1080`，操作系统设置的分辨率为 `1280x720`，网页的放大倍数为 `110%`，请计算一个 CSS 像素对应多少个显示器物理像素（面积与长度）？
    + 1920*1080/1.1/1280/720=2.11
37.  写出如下代码显示在浏览器后**每个单词**的字号
    ```html
    <style>
      html {
        font-size: 20px;
      }
      section {
        font-size: 10rem;
      }
      p {
        font-size: 24px;
      }
      span {
        font-size: 150%;
      }
      .sucks {
        font-size: inherit;
      }
    </style>
    <body>
      <section>
        <h2>Brown</h2>
        <p>quick</p>
        <p>jumps <span>over <span>lazy</span> dog</span></p>
        <p class="sucks">sucks</p>
      </section>
    </body>
    ```



    + Brown:300px;
    + quick:24px;
    + jumps:24px;
    + over:36px;
    + lazy:54px;
    + dog:36px;
    + sucks:200px;
38.  如何给css添加注释
    + /*这是一条注释*/
39. 指出如下css代码中的错误
    ```
    p,h1,{

        background-color: rgba:(abc)
        font-varient; abc;
        colr: #ff048;
        font: "serif" 25px;
    }
    ```
    + p,h1{}
    + rgba(x,y,z,a);
    + font-variant:normal/small-caps/inherit;
    + color:#abc/#abcd/#abcde;
    + [font-style || font-variant || font-weight] font-size[ / line-height] font-family
    + font:25px serif;
40. 写出如下结构中div元素的所有后代/祖先/子/父/兄弟元素
    ```html
    <section>
      <h1><span></span></h1>
      <main>
        <h2></h2>
        <div>
          <ul>
            <li><a href=""><img src="" alt=""></a></li>
          </ul>
        </div>
        <aside>
          <h3></h3>
        </aside>
      </main>
    </section>
    ```
    + 后代元素:ul,li,a,img
    + 祖先元素:main,section
    + 子元素:ul
    + 父元素:main
    + 兄弟元素:h2,aside

41. 常见的替换元素有哪些？它们与非替换元素最大的区别什么？
    + img,radio,checkbox,input,iframe,video,canvas
    + 有内在宽高
    + 替换元素没有后代元素/标签/节点,其内容被其他不在文档里的内容替换.而非替换元素内容直接出现在其标记中.
42. 让 CSS 在 HTML 页面上生效有哪些方法，分别写出来。
    + style标签:<style>p {color:red;}</style>
    + link标签:<link rel="stylesheet" href="print.css" >
    + 内联样式:<div style="color:red;font-size:45px;"></div>
    + DOM:el.style.color = 'red'
    + import指令:(必须出现在文件头)@import "../aa.css";
43. 如何让页面打印时应用不同的效果？
    + link标签:<link rel="stylesheet" href="print.css" media="print">设置在打印时应用的css样式.
44. 假设 index.html 的路径为 http://user.coding.me/task/index.html ，如下引用的a.css和b.css路径分别为？
    ```html
    <!-- index.html的内容 -->
    <style>
        @import "../a.css";
    </style>
    ```
    ```css
    /* a.css的内容 */
    @import "b.css";
    ```
    + a.css: http://user.coding.me/a.css
    + b.css: http://user.coding.me/b.css
45. 写出满足如下条件的选择器
    * 第 8 个子结点之后，倒数第 5 个子结点之前的li结点
      + li:nth-child(n+8):nth-last-child(-n+5){}
    * 【类名】以“damiao-”开头的元素
      + [class^="damiao-"],[class*=" damiao-"]{}
    * rel 属性中有 nofollow 这个单词的标签
      + [rel~="nofollow"]{}
46. 链接伪类的几种状态书写的顺序是什么？为什么？
      + :link-:visited-:hover-:active
      + 这几个状态的权重/来源和特殊性完全相同,在样式表中后出现的一个会胜出.如果不按照这个顺序,写在前面的伪类会被后面的伪类覆盖,例如:active写在前,会被:link覆盖
47. 如下 font 属性的值哪一个是书写正确的？
    * font: serif 24px;
    * font: serif bold 24px/1.2;
    * font: bold 24px/1.2 serif;(正确)
48. 详述你对盒模型的理解。
    + 每个元素都会生成一个或多个矩形框,这些矩形框是可以嵌套的,每个矩形框可以有可选的外边距,边框,内边距
    + 一个完整的块框包含content,padding,border,margin这几部分.margin可以为负值,padding不能为负值.
    + 默认情况:width,height设置为content-box,可以用box-sizing可改变为border-box/content-box的宽高
    + 水平格式化包括七大属性(margin-left,border-left,padding-left,width,padding-right,border-right,margin-right),垂直格式化相应也包含七大属性.
    + 水平格式化其中只有三个属性可以设置为auto:左右margin和width两个auto:
      + 两个margin为auto:两边auto计算成一样的正值;如无法都为正,则左为0,右为负值
      + 一个margin为auto,width为auto:相当于为auto的margin为0
      + 三个auto:相当于左右margin为auto
      + 零个auto:过分受限,重置右margin
    + 水平格式化不会出现边距合并的情况,垂直格式化可能出现边距合并的情况:
      + 边框合并:如果一个包含块高度为auto,没有border,padding,且只有块级子元素,其默认高度为最高会计子元素的外边框边界到最低块级子元素外边框,也就是说不包含子元素上下的margin,子元素margin会成为包含块margin

      + 边框不合并:但是如果包含块有padding或border,则包含子元素上下的margin,是从最高子元素的上外边距边界到最低子元素下外边距边界的距离.如果子元素margin为负,包含块高度越来越小,但最低为0,不会为负值.如果包含块有margin,产生margin合并.
      + 垂直外边距合并:相邻的margin合并,保留最大的margin;如果都为负margin,保留绝对值最大者;一正一负做抵消.(兄弟元素/父子元素都有可能发生)
49. 元素的高度写百分比在什么情况下【无效】，为什么？在什么情况下【有效】，有效时是以哪个元素的高度为基准值？
      + 父元素高度不由子元素撑起时生效
      + 父元素高度由子元素撑起时无效
50. 字体的 italic 与 oblique 的区别是？
    + oblique : 倾斜的字体,直接把原字体倾斜过来的字体.
    + italic是专门为原字体设计的斜体字,如果没有该字体,则应用oblique字体
51. 什么是模拟信号？什么是数字信号？它们的区别是？
    + 模拟信号:把设备里读出来的物理量直接使用,是一种信号与信息的不断变化的物理量表示。
    + 数字信号:把模拟信号理解成01,是一种信号与自变量和因变量的分散。独立变量通常用整数表示的，而因变量的数量有限的数字表示.二进制编码是一种数字信号.
    + 模拟信号是连续的,数字信号是离散的.模拟信号衰减比较小适合远距离传输;数字信号衰减严重适合近距离传输.
    + 模拟信号会被干扰,数字信号可以几乎完全消除误差
52. 将如下 markdown 转换成 html
    ```md
    ## 四季变换

    一年有四季，
    四季有其对应的节气

    * 春
        - 立春
        - 惊蛰
        - 元宵
    * 夏
        - **小米**发布会
        - 华为发布会
    * 秋
        - 开学了
        - 军训了
    * 冬
        - 下雪了
            + 打雪仗了
        - 来暖气了
        - 开空调了

    > 知识就是力量，法国就是培根。

    [春](http://baike.baidu.com/item/%E6%98%A5/6983693)
    ![春](https://www.google.com.hk/images/nav_logo242_hr.png)
    ```

    ```html
    ul-li
  <h2>四季变换</h2>
  <p>一年有四季,</p>
  <p>四季有其对应的节气</p>
  <br>
  <ul>
    <li>春
      <ul>
    <li>立春</li>
    <li>惊蛰</li>
    <li>元宵</li>
    </ul>
    </li>
    <li>夏
      <ul>
    <li><b>小米</b>发布会</li>
    <li>华为发布会</li>
    </ul>
    </li>
    <li>秋
      <ul>
    <li>开学了</li>
    <li>军训了</li>
    </ul>
    </li>
    <dt>冬
    <dd>
      <dl>
        <dt>下雪了</dt>
        <dd>打雪仗了</dd>
      </dl>
    </dd>
    <dd>来暖气了</dd>
    <dd>开空调了</dd>
    </dt>
  </ul>
  <br>
  <blockquote>知识就是力量,法国就是培根。</blockquote>
  <br>
  <p><a href="http://baike.baidu.com/item/%E6%98%A5/6983693">春</a></p>
  <p><img src="https://www.google.com.hk/images/nav_logo242_hr.png" alt="春"></p>
  ```
53. 如下表单提交后将跳转到什么地址
    ```html
    <form action="https://www.baidu.com/s" target="_blank">
      <input type="text" value="bb" name="a">
      <input type="checkbox" name="b" id="b" value="123" checked>
      <input type="checkbox" name="b" id="b" value="456" checked>
      <input type="checkbox" name="b" id="b" value="789">
      <input type="radio" name="c" id="c" value="a2">
      <input type="radio" name="c" id="c" value="a5" checked>
      <input type="radio" name="c" id="c" value="a4">
      <select name="select">
        <option value="01">0001</option>
        <option value="02">0002</option>
        <option value="03" selected>0003</option>
        <option value="04">0004</option>
        <option value="05">0005</option>
      </select>
      <button>提交</button>
    </form>
    ```

    + 打开新标签跳转到https://www.baidu.com/s?a=bb&b=123&b=456&c=a5&select=03


54. 列出 input 的 type 有哪些值，以及为各个值时分别需要怎么使用。
    + text:maxlength, minlength
    + range:max,min
    + color
    + number
    + button
    + password
    + email
    + file:accept
    + image:src,alt
55. 想要让一个文本输入框在页面打开后自动获得光标要怎么办？
    + input标签里加上autofocus,自动获取焦点
56. 如何在文本框里放置提示性文字？
    + <input type="text" placeholder="提示性文字">
57. option 标签的主体内容太长影响用户体验，你会如何解决？
    ```
    + 用<optgroup>给<option>标签分类
    + 用其他标签画出一个select的样式
    + 将内容截断只展示一部分,但将完整内容写title属性上
    ```
58. 想要在 textarea 标签中默认显示一段 html 代码最安全的做法是什么？
    + <textarea name="textarea" rows="10" cols="50"><span>&lt;/textarea></textarea>
    +
59. 如何禁用一组输入框？
    <fieldset disabled>
    </fieldset>
60. 如下表格渲染出来后是什么效果？不要直接将代码贴入jsbin中看效果
    ```html
    <table border=1>
      <caption>美国队长</caption>
      <col>
      <col bgcolor=red>
      <col>
      <colgroup bgcolor=pink>
        <col>
        <col>
        <col bgcolor=brown>
      </colgroup>
      <thead>
        <tr>
          <th>01</th>
          <th>02</th>
          <th>03</th>
          <th>04</th>
          <th>05</th>
          <th>06</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>abc</td>
          <td colspan=3 rowspan=2>abc</td>
          <td>abc</td>
          <td>abc</td>
        </tr>
        <tr>
          <td>abc</td>
          <td colspan=2 rowspan=3>abc</td>
        </tr>
        <tr bgcolor=lightgreen>
          <td colspan=2 rowspan=2>abc</td>
          <td>abc</td>
          <td>abc</td>
        </tr>
        <tr>
          <td>abc</td>
          <td>abc</td>
        </tr>
      </tbody>
    </table>
    ```
    + img
61. 写出如下标签或属性值的英文全称

    标签：html,div,p,a,em,tr,th,td,col,ul,ol,li,dl,dt,dd,pre,nav
    + Hypertext Markup Language, division, paragraph, anchor, emphasized, table row, table head cell, table data cell, unordered list, ordered list,list, definition list, definition term, definition description, preformatted, navigation.

    属性：coord,rect,poly,href,src
    + coordinate, rectangle, polygon, hypertext reference, source

62. 请说出你对命令行程序的理解，以及其与 GUI 程序的区别
    + GUI:图形用户界面.用户界面的所有元素图形化，主要使用鼠标作为输入工具，点击图标执行程序，使用按钮、菜单、对话框等进行交互，追求易用，看起来比较美.例如:Word,excel,PPT
    + CLI:命令行界面.用户界面字符化，使用键盘作为输入工具，输入命令、选项、参数执行程序，追求高效，看起来比较酷.例如:CMD,Linux

63. 请确认以下标签分别属于什么类别（Content Category）？
    p, meta, h1, fieldset, option, input, area
    + metadata content:meta
    + flow content:p,fieldset,area
    + heading content:h1
    + input:form-associated content,interactive content
64. 解释 box-sizing 可以取哪些值，以及每个值的意义
    + content-box
    + border-box
    + 设置width和height所对应的是内容块还是边框块
65. 简述 ie7 市场份额比 ie6 低的原因并在网络上找出目前各大浏览器在中国和全球的市场份额
    + ie7发布于2006年,距ie6发布已经过去了5年多,习惯不好改变.而且只能装在windowsxp上
    + 中国存在大量盗版系统,盗版windowsxp预装ie6;
    + 在线银行,政府部门严重依赖IE6;
66. 画出如下代码中 div 及其子元素的渲染结果，并指出 p 标签中【每个行内元素的，内容区，行内框的范围】，p 元素的行框，并指明理论的行框高度。有尺子的可以以 1mm 为 2px 来绘制。
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>JS Bin</title>
      <style>
        p {
          font-size: 20px;
          line-height: 120%;
          margin: 30px;
          margin-left: auto;
          margin-right: -20px;
          width: 300px;
          background-color: tan;
        }

        .a {
          display: inline-block;
        }

        .b {
          font-size: 30px;
          vertical-align: 15px;
        }

        .c {
          display: inline-block;
          width: 60px;
          height: 60px;
          background-color: pink;
          margin: 8px;
        }

        img {
          box-sizing: border-box;
          width: 50px;
          height: 50px;
          border: 2px solid;
          margin: 4px;
          vertical-align: -10px;
          margin-bottom: -5px;
        }
        div {
          width: 400px;
          border: 1px dotted;
        }
      </style>
    </head>
    <body>
      <div>
        <p>
          <span class=a>foo</span>
          <!-- 内容区:24px,0,行内框:20px -->
          <span class=b>bar</span>
          <!--内容区:行内框:15px,30px-->
          <span class=c></span>
          <!-- 行内框:60px*76px,0px,高76px -->
          <img src="https://drscdn.500px.org/photo/205228769/m%3D1170_k%3D1/d721302d063d447aa3bd6301dc1cba87" alt="">
          <!-- 行内框:50*50px,-10px,高49px -->
          <!-- 行框:高-10 - 76 -->
        </p>
      </div>
    </body>
    </html>
    ```

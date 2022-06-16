import * as superagent from "superagent";
import * as cheerio from "cheerio";
interface Course {
  title: string;
  count: number;
}
class Crawler {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  // private url = "https://voice.baidu.com/act/newpneumonia/newpneumonia#tab0";
  constructor() {
    this.initSpiderProcess();
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const courseRes = this.getCourseInfo(html);
    this.generateJson(courseRes);
  }
  generateJson(courseRes:any) {
    console.log("course", courseRes);
  }
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfo: Course[] = [];
    courseItems.map((index, element) => {
      const desc = $(element).find(".course-desc");
      const title = desc.eq(0).text();
      const count = +desc.eq(1).text().split("：")[1];
      courseInfo.push({ title, count });
    });
    const res = {
      time: new Date().getTime(),
      data: courseInfo,
    };
    return res;
  }

  async getRawHtml() {
    const res = await superagent.get(this.url);
    // console.log(res.text);
    return res.text;
  }
}
const crawler = new Crawler();

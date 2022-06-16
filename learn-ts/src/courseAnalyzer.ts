import * as cheerio from "cheerio";
import * as fs from "fs";
import { Analyzer } from "./crawler";
interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [key: number]: Course[];
}

class CourseAnalyzer implements Analyzer {
  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJson(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfo: Course[] = [];
    courseItems.map((idx, element) => {
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
  private generateJson(courseInfo: CourseResult, filePath: string) {
    console.log("course", courseInfo);

    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
}

export default CourseAnalyzer;

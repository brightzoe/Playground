import { Analyzer } from "./crawler";

export default class Covid19Analyzer implements Analyzer {
  public analyze(html: string, path: string) {
    return "covid19";
  }
}

import Home from "views/Home.js";
import PDFviewReport from "views/PDFviewReport.js";
import PDFviewTermPaper from "views/PDFviewTermPaper.js";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: Home,
    layout: "/home",
  },
  {
    path: "/report",
    name: "Major Report",
    icon: "tim-icons icon-paper",
    component: PDFviewReport,
    layout: "/report",
  },
  {
    path: "/term-papers",
    name: "Term paper",
    icon: "tim-icons icon-paper",
    component: PDFviewTermPaper,
    layout: "/term-paper",
  },
];
export default routes;

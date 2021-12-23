// @ts-ignore
import {Windows} from "./Windows.ts";

if(document.getElementById("container")) {
    const windows = new Windows();
    windows.init();
}

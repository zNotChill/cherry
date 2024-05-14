import { Skript } from "../core/Skript";
import Periodical from "../core/classes/Periodical";

export const test = new Periodical("1 second", ($) => {
  $.send("abaxc", {
    name: "zNotChill"
  })

  $.send.formatted("abaxc", {
    name: "zNotChill"
  })

  $.wait("1 second")

  $.variable("test", 1, ["global"])
  $.variable("test", 1, ["local"])
  $.variable("test", 1, ["temp"])

  $.var("test", 1, ["global"])
})
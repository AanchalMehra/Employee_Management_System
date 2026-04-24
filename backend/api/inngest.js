import { serve } from "inngest/express";
import { inngest, functions } from "../Inngest/index.js";

export default serve({
  client: inngest,
  functions,
});
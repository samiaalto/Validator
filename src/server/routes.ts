import * as express from "express";
import axios from "axios";
import validate3 from "./components/Validate3";
import getFormats from "./components/getFormats";
import standalone from "./components/validation/generator/SmartShip";
import standalone_postra from "./components/validation/generator/Postra_parcel";
import generateValidationData from "./components/GenerateValidationData";

var bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

router.get("/api/hello", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.co/search/shows?q=heist`
    );
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

router.get("/api/build", async (req, res, next) => {
  try {
    //generateValidationData("SMARTSHIP");
    //standalone();
    standalone_postra();
    res.json("success");
  } catch (error) {
    return next(error);
  }
});

router.get("/api/getFormats", async (req, res, next) => {
  try {
    const data = await getFormats();
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

router.post("/api/validate2", async (req, res, next) => {
  if (req.body) {
    const t0 = process.hrtime();
    try {
      const data = await validate3(req.body.data, req.body.params.format);
      //console.dir(data, { depth: null });
      const t1 = process.hrtime(t0);
      const processTime = (t1[0] * 1000000000 + t1[1]) / 1000000;

      res.json({
        valid: data?.valid,
        errors: data?.errors,
        processTime: Math.round(processTime),
      });
    } catch (error) {
      console.log(error);
      return next({ error });
    }
  }
});

export default router;

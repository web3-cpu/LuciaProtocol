import { User } from "../models/User.js";
import { Client } from "../models/Client.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { Button_click } from "../models/ButtonClick.js";
import { ApiKey } from "../models/ApiKey.js";
import { Op } from "sequelize";
import { Campaign } from "../models/Campaign.js";
import { Generated_link } from "../models/GeneratedLink.js";
import { sequelize } from "../db/database.js";
import { User_association_client } from "../models/User_assoc_client.js";
import getMetrics from "../services/metrics.service.js";

export const distinctFingerprints = async (req, res) => {
  try {
    const client = req.me;
    const fingerprints = await Fingerprint.findAll({
      order: [["createdAt", "DESC"]],
    });
    // TODO
    res.status(200).json(fingerprints);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getUsers = async (req, res) => {
  try {
    const client = req.me;
    const users = await User_association_client.findAll({
      where: {
        client_id: client.id,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send();
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getInfo = async (req, res) => {
  try {
    let user = req.me;

    const apiKeyCount = await ApiKey.count({
      where: {
        client_id: user.id,
      },
    });

    const linkCount = await Campaign.count({
      where: {
        client_id: user.id,
      },
    });

    return res.status(200).json({
      name: user.name,
      confirmedEmail: user.verified,
      companyName: user.company_name,
      firstLinkCreated: linkCount !== 0,
      apiKeyCreated: apiKeyCount !== 0,
      onboarding: user.onboarding,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const setOnboardingInfo = async (req, res) => {
  try {
    const client = req.me;
    await Client.update(
      {
        onboarding: JSON.stringify(req.body.onboarding),
      },
      {
        where: {
          id: client.id
        },
      }
    );
    return res.status(200).json({
      done: true
    });
  } catch (error) {
    res.status(400).send();
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const timeSpanMiddleWare = async (req, res, next) => {
  try {
    if (!req.body || !req.body.time_range || req.body.time_range == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      countTimeSpan(req.body.time_range).then((dates) => {
        // console.log(start);
        // console.log(end);
        res.locals.dates = dates;
        next();
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getPageViews = async (req, res) => {
  try {
    const client = req.me;
    const dates = res.locals.dates;
    const pageViews = await Page_view.findAll({
      include: [
        {
          model: Fingerprint,
          required: false,
          include: [
            {
              model: User,
              required: false,
            },
          ],
        },
        {
          model: User,
          required: false,
        },
      ],
      where: {
        client_id: client.id,
        created_at: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [["created_at", "DESC"]],
    });

    console.log("data stored");
    res.status(200).json(pageViews);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getConversions = async (req, res) => {
  try {
    const client = req.me;
    const dates = res.locals.dates;
    const conversion = await Conversion_data.findAll({
      include: [
        {
          model: Fingerprint,
          required: false,
          include: [
            {
              model: User,
              required: false,
            },
          ],
        },
        {
          model: User,
          required: false,
        },
      ],
      where: {
        client_id: client.id,
        created_at: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(conversion);
  } catch (error) {
    console.log(error.message);
    console.log("error in getConversions");
  }
};
export const getClicks = async (req, res) => {
  try {
    const client = req.me;
    const dates = res.locals.dates;
    const clicks = await Button_click.findAll({
      include: [
        {
          model: Fingerprint,
          required: false,
          include: [
            {
              model: User,
              required: false,
            },
          ],
        },
        {
          model: User,
          required: false,
        },
      ],
      where: {
        client_id: client.id,
        created_at: {
          [Op.between]: [dates.startDate, dates.endDate],
        },
      },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(clicks);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const client = req.me;
    const campaigns = await Generated_link.findAll({
      include: [
        {
          model: Campaign,
          left: true,
          required: false,
        },
      ],
      where: [
        {
          client_id: client.id,
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getLinks = async (req, res) => {
  try {
    const client = req.me;

    const links = await Generated_link.findAll({
      include: [
        {
          model: Campaign,
          left: true,
          required: false,
        },
      ],
      where: [
        {
          client_id: client.id,
        },
      ],
      order: [["created_at", "DESC"]],
    });
    //console.log(campaigns);
    res.status(200).json(links);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getLink = async (req, res) => {
  try {
    const client = req.me;
    const { id } = req.params;

    const link = await Generated_link.findOne({
      include: [
        {
          model: Campaign,
          left: true,
          required: false,
        },
      ],
      where: [
        {
          id,
          client_id: client.id,
        },
      ],
      order: [["created_at", "DESC"]],
    });
    //console.log(campaigns);
    res.status(200).json(link);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getPages = async (req, res) => {
  try {
    const client = req.me;
    const pages = await Page_view.findAll({
      attributes: [
        "page",
        [sequelize.fn("COUNT", sequelize.col("*")), "count"],
      ],
      where: {
        client_id: client.id,
      },
      group: ["page"],
    });
    res.status(200).json(pages);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getEvents = async (req, res) => {
  try {
    const client = req.me;
    const events = await Conversion_data.findAll({
      attributes: [
        "event_tag",
        [sequelize.fn("COUNT", sequelize.col("*")), "count"],
        [sequelize.fn("SUM", sequelize.col("amount")), "sum"],
      ],
      where: {
        client_id: client.id,
      },
      group: ["event_tag"],
    });
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const getButtons = async (req, res) => {
  try {
    const client = req.me;
    const buttons = await Button_click.findAll({
      attributes: [
        "button",
        [sequelize.fn("COUNT", sequelize.col("*")), "count"],
      ],
      where: {
        client_id: client.id,
      },
      group: ["button"],
    });
    res.status(200).json(buttons);
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

async function countTimeSpan(range) {
  var startDate = new Date();
  var endDate = new Date();
  if (range === "1D") {
    startDate.setDate(endDate.getDate() - 1);
  } else if (range === "2D") {
    startDate.setDate(endDate.getDate() - 2);
  } else if (range === "1W") {
    startDate.setDate(endDate.getDate() - 7);
  } else if (range === "1M") {
    startDate.setMonth(endDate.getMonth() - 1);
  } else if (range === "1Y") {
    startDate.setFullYear(endDate.getFullYear() - 1);
  }

  return { startDate, endDate };
}

export const getMetricsData = async (req, res) => {
  try {
    const client = req.me;
    const { type } = req.params;
    const {
      group_by: groupBy,
      start_time: startTime,
      end_time: endTime,
      link_id: linkId,
    } = req.query;

    const data = await getMetrics(
      type,
      client,
      groupBy,
      startTime || endTime
        ? {
            startTime,
            endTime,
          }
        : null,
      linkId
    );

    res.status(200).json({ data });
  } catch (error) {
    console.log(error.message);
    if (error.message === "Not Implemented") {
      res.status(404).json({ msg: "Metric is not implemented yet." });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

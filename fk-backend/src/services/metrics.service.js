import { sequelize } from "../db/database.js";

/**
 * Example function to get metric
 * @param {*} client : Client/Company
 * @param {*} duration : {startTime, endTime} - optional
 * @param {*} groupBy : "day" | "month" | "year" | "total" - optional, total by default
 * export const getMetrics = (client, groupBy, duration) => {}
 */

const GROUP_BY_OPTIONS = {
  DAY: "day",
  MONTH: "month",
  YEAR: "year",
  TOTAL: "total",
};

const getNumberOfTotalLinkClicks = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select count(lc.id) from link_clicks lc
  // inner join generated_link gl on lc.link_id = gl.id
  // where gl.client_id = {client_id} and lc."created_at" between {start_time} and {end_time};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', lc.created_at) AS date`]),
      "COUNT(lc.id) AS count",
    ];
    const whereClause = [
      "gl.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
      ...(duration ? ["lc.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM link_clicks lc INNER JOIN generated_link gl ON lc.link_id = gl.id 
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting total link clicks:", error);
    throw error;
  }
};

const getNumberOfUniqueLinkClicks = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select count(distinct lc.lucia_user_id) from link_clicks lc
  // inner join generated_link gl on lc.link_id = gl.id
  // where gl.client_id = {client_id} and lc."created_at" between {start_time} and {end_time};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', lc.created_at) AS date`]),
      "COUNT(DISTINCT lc.lucia_user_id) AS count",
    ];
    const whereClause = [
      "gl.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
      ...(duration ? ["lc.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM link_clicks lc INNER JOIN generated_link gl ON lc.link_id = gl.id 
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting unique link clicks:", error);
    throw error;
  }
};

const getNumberOfNewUniqueLinkClicks = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select count(lucia_user_id) from (
  //   select distinct on (lc.lucia_user_id) lc.lucia_user_id, lc.created_at
  //   from link_clicks lc
  //   inner join generated_link gl on lc.link_id = gl.id
  //   where gl.client_id = {client_id}
  //   order by lc.lucia_user_id, lc.created_at asc
  // ) where created_at between {start_date} and {end_date};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', created_at) AS date`]),
      "COUNT(lucia_user_id) AS count",
    ];
    const whereClause = duration
      ? "WHERE created_at BETWEEN :start_time AND :end_time"
      : "";
    const innerWhereClause = [
      "gl.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM (
                    SELECT DISTINCT ON (lc.lucia_user_id) lc.lucia_user_id, lc.created_at
                    FROM link_clicks lc
                    INNER JOIN generated_link gl ON lc.link_id = gl.id
                    WHERE ${innerWhereClause.join(" AND ")}
                    ORDER BY lc.lucia_user_id, lc.created_at ASC
                  )
                  ${whereClause} ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting new unique link clicks:", error);
    throw error;
  }
};

const getMarketingValue = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration
) => {
  // select sum(cd.cost) from campaign c where c.client_id = {client_id} and c.created_at between {start_date} and {end_date};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', c.created_at) AS date`]),
      "SUM(c.cost) AS sum",
    ];
    const whereClause = [
      "c.client_id = :client_id",
      ...(duration ? ["c.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM campaign c
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting marketing value:", error);
    throw error;
  }
};

const getSalesValue = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration
) => {
  // select sum(cd.amount) from conversion_data cd where cd.client_id = {client_id} and cd.created_at between {start_date} and {end_date};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', cd.created_at) AS date`]),
      "SUM(cd.amount) AS sum",
    ];
    const whereClause = [
      "cd.client_id = :client_id",
      ...(duration ? ["cd.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM conversion_data cd
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting marketing value:", error);
    throw error;
  }
};

const getNumberOfLinkClicksByAgent = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select agent, count(id) from
  // (select lc.id, lc.created_at,
  // CASE
  //   WHEN (f.data::json->'agent')::text LIKE '%edge%'THEN 'Edge'
  //   WHEN (f.data::json->'agent')::text LIKE '%MSIE%' THEN 'Internet Explorer'
  //   WHEN (f.data::json->'agent')::text LIKE '%Firefox%' THEN 'Mozilla Firefox'
  //   WHEN (f.data::json->'agent')::text LIKE '%Chrome%' THEN 'Google Chrome'
  //   WHEN (f.data::json->'agent')::text LIKE '%Safari%' THEN 'Apple Safari'
  //   WHEN (f.data::json->'agent')::text LIKE '%Opera%' THEN 'Opera'
  //   WHEN (f.data::json->'agent')::text LIKE '%Outlook%' THEN 'Outlook'
  //   ELSE 'Unknown'
  // END AS agent
  // from link_clicks lc inner join fingerprints f on lc.fingerprint_id = f.id where lc.client_id = {client_id} and lc."created_at" between {start_time} and {end_time})
  // group by agent;

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', created_at) AS date`]),
      "agent",
      "COUNT(id) AS count",
    ];
    const whereClause = [
      "lc.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
      ...(duration ? ["lc.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL
        ? "GROUP BY agent"
        : `GROUP BY agent, date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} FROM (
                    SELECT lc.id, lc.created_at, 
                    CASE
                      WHEN (f.data::json->'agent')::text LIKE '%edge%'THEN 'Edge'
                      WHEN (f.data::json->'agent')::text LIKE '%MSIE%' THEN 'Internet Explorer'
                      WHEN (f.data::json->'agent')::text LIKE '%Firefox%' THEN 'Mozilla Firefox'
                      WHEN (f.data::json->'agent')::text LIKE '%Chrome%' THEN 'Google Chrome'
                      WHEN (f.data::json->'agent')::text LIKE '%Safari%' THEN 'Apple Safari'
                      WHEN (f.data::json->'agent')::text LIKE '%Opera%' THEN 'Opera' 
                      WHEN (f.data::json->'agent')::text LIKE '%Outlook%' THEN 'Outlook' 
                      ELSE 'Unknown'
                    END AS agent
                    FROM link_clicks lc INNER JOIN fingerprints f ON lc.fingerprint_id = f.id
                    WHERE ${whereClause.join(" AND ")}
                  )
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting total link clicks by agent:", error);
    throw error;
  }
};

const getNumberOfLinkClicksByLanguage = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select language, count(id) from
  // (select lc.id, lc.created_at, (f.data::json->'language')::text AS language
  // from link_clicks lc inner join fingerprints f on lc.fingerprint_id = f.id where lc.client_id = {client_id} and lc."created_at" between {start_time} and {end_time})
  // group by language;

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', created_at) AS date`]),
      "language",
      "COUNT(id) AS count",
    ];
    const whereClause = [
      "lc.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
      ...(duration ? ["lc.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL
        ? "GROUP BY language"
        : `GROUP BY language, date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} FROM (
                    SELECT lc.id, lc.created_at, (f.data::json->'language')::text AS language
                    FROM link_clicks lc INNER JOIN fingerprints f ON lc.fingerprint_id = f.id
                    WHERE ${whereClause.join(" AND ")}
                  )
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting total link clicks by agent:", error);
    throw error;
  }
};

const getNumberOfVisitedCustomers = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration,
  linkId
) => {
  // select count(distinct luau.user_id) from link_clicks lc
  // inner join lucia_user_association_user luau on lc.lucia_user_id = luau.lucia_user_id
  // inner join user_association_client uac on uac.user_id = luau.user_id and uac.client_id = {client_id}
  // where lc.client_id = {client_id} and lc."created_at" between {start_date} and {end_date};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', lc.created_at) AS date`]),
      "COUNT(DISTINCT luau.user_id) AS count",
    ];
    const whereClause = [
      "lc.client_id = :client_id",
      ...(linkId ? ["lc.link_id = :link_id"] : []),
      ...(duration ? ["lc.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM link_clicks lc
                  INNER JOIN lucia_user_association_user luau ON lc.lucia_user_id = luau.lucia_user_id
                  INNER JOIN user_association_client uac ON uac.user_id = luau.user_id AND uac.client_id = :client_id
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
        link_id: linkId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting visited customers:", error);
    throw error;
  }
};

const getNumberOfNewVisitedCustomers = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration
) => {
  try {
    // Build the SELECT attributes based on whether we need to group by date
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', created_at) AS date`]),
      "COUNT(DISTINCT luac.lucia_user_id) AS count",
    ];
    
    // Add WHERE clause for the duration
    const whereClause = duration
      ? "WHERE luac.client_id = :client_id AND luac.created_at BETWEEN :start_time AND :end_time"
      : "WHERE luac.client_id = :client_id";
    
    // Add grouping clause if needed
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    
    // Add ordering clause if grouping by date
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    
    // Construct the full query
    const query = `SELECT ${attributes.join(", ")}
                   FROM lucia_user_association_client luac
                   ${whereClause}
                   ${groupByClause}
                   ${orderByClause}`;

    // Execute the query
    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting new visited customers:", error);
    throw error;
  }
};

const getNumberOfPayingCustomers = async (
  client,
  groupBy = GROUP_BY_OPTIONS.TOTAL,
  duration
) => {
  // select count(distinct cd.user_id) from conversion_data cd where cd.client_id = {client_id} and cd.created_at between {start_date} and {end_date};

  try {
    const attributes = [
      ...(groupBy === GROUP_BY_OPTIONS.TOTAL
        ? []
        : [`date_trunc('${groupBy}', cd.created_at) AS date`]),
      "COUNT(DISTINCT cd.user_id) AS count",
    ];
    const whereClause = [
      "cd.client_id = :client_id",
      ...(duration ? ["cd.created_at BETWEEN :start_time AND :end_time"] : []),
    ];
    const groupByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `GROUP BY date`;
    const orderByClause =
      groupBy === GROUP_BY_OPTIONS.TOTAL ? "" : `ORDER BY date ASC`;
    const query = `SELECT ${attributes.join(", ")} 
                  FROM conversion_data cd
                  WHERE ${whereClause.join(" AND ")}
                  ${groupByClause} ${orderByClause}`;

    return await sequelize.query(query, {
      replacements: {
        client_id: client.id,
        start_time: duration?.startTime,
        end_time: duration?.endTime,
      },
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error counting total link clicks:", error);
    throw error;
  }
};

const getMetrics = async (type, client, groupBy, duration, linkId) => {
  const implementations = {
    "total-link-clicks": getNumberOfTotalLinkClicks,
    "unique-link-clicks": getNumberOfUniqueLinkClicks,
    "new-unique-link-clicks": getNumberOfNewUniqueLinkClicks,
    "marketing-value": getMarketingValue,
    "sales-value": getSalesValue,
    "link-clicks-by-agent": getNumberOfLinkClicksByAgent,
    "link-clicks-by-language": getNumberOfLinkClicksByLanguage,
    "visited-customers": getNumberOfVisitedCustomers,
    "new-visited-customers": getNumberOfNewVisitedCustomers,
    "paying-customers": getNumberOfPayingCustomers,
  };

  if (!implementations[type]) throw new Error("Not Implemented");

  return await implementations[type](client, groupBy, duration, linkId);
};

export default getMetrics;

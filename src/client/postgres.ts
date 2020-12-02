import {Client} from 'ts-postgres';
import {Result} from "../entity/result";
import {getAttributeName} from "../utils/helpers";

/**
 * Initialize postgres client by setting required attributes
 * @type {Client}
 */
export const client = new Client({
  host: 'localhost',
  port: 54320,
  user: 'quno_challenge_db',
  password: 'localpwd',
  database: 'quno_challenge_db',
  extraFloatDigits: 3,
  keepAlive: true,
  preparedStatementPrefix: 'tsp_'
});

/**
 * Receives table name and options as the parameters and gets the
 * data based on the parameters
 * @param {string} tableName
 * @param options
 * @returns {Promise<any>}
 */
const findAll = async (tableName: string, options: any) => {
  let result;
  try {
    await client.connect();
    let queryStr = `SELECT * FROM ${tableName} `;
    queryStr = queryStr + ((options.orderBy) ? `ORDER BY ${getAttributeName(options.orderBy)} ${options.isAsc === 1 ? 'ASC' : 'DESC'} ` : '');
    queryStr = queryStr + ((options.limit) ? `LIMIT ${options.limit} ` : '');
    queryStr = queryStr + ((options.offset) ? `OFFSET ${options.offset} ` : '');
    result = await client.query(queryStr);
    await client.end();
  } catch (e) {
   throw e;
  }
  return result;
};

/**
 * Receives table name and id as the parameters and gets the data
 * based on the parameters
 * @param {string} tableName
 * @param {number} id
 * @returns {Promise<any>}
 */
const findById = async (tableName: string, id: number) => {
  let result;
  try {
    await client.connect();
    result = await client.query(`SELECT * FROM ${tableName} WHERE id='${id}'`);
    await client.end();
  } catch (e) {
    throw e;
  }
  return result;
};

/**
 * Receives tableName and object, check if it's already exist,
 * if yes, then return result with the message already exist
 * else insert the data on to the tableName.
 * @param {string} tableName
 * @param data
 * @returns {Promise<Result>}
 */
const checkAndInsert = async (tableName: string, data: any) => {
  let result;
  try {
    await client.connect();
    const doc = await client.query(`SELECT * FROM ${tableName} WHERE slug = '${data.slug}'`);

    if (doc.rows.length > 0) {
      await client.end();
      return new Result(`Doctor with slug ${data.slug} already exist!`, undefined);
    }

    await client.query(`INSERT INTO ${tableName} (name, city, country, quno_score_number, ratings_average, 
    treatments_last_year, years_experience, base_price, avatar_url, slug) 
    VALUES 
    ('${data.name}', '${data.city}', '${data.country}', '${data.qunoScoreNumber}', '${data.ratingsAverage}', 
    '${data.treatmentsLastYear}', '${data.yearsExperience}', '${data.basePrice}', '${data.avatarUrl}', '${data.slug}')`);

    result = await client.query(`SELECT * FROM ${tableName} WHERE slug = '${data.slug}'`);
    await client.end();
  } catch (e) {
    throw e;
  }
  return new Result('success', result);
};


export { findAll, findById, checkAndInsert };
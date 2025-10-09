import pool from "../index";

import { newCourse } from "@/types/index";

export const addNewCourse = async (newCourse: newCourse) => {
  const result = await pool.query<newCourse>(
    "insert into courses (title_en, title_ar,description_en, description_ar, target_audience_en, target_audience_ar, delivery_method_en, delivery_method_ar, duration, training_id,starting_date) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *",
    [
      newCourse.title_en,
      newCourse.title_ar,
      newCourse.description_en,
      newCourse.description_ar,
      newCourse.target_audience_en,
      newCourse.target_audience_ar,
      newCourse.delivery_method_en,
      newCourse.delivery_method_ar,
      newCourse.duration,
      newCourse.training_id,
      newCourse.starting_date,
    ]
  );

  return result.rows;
};

export const getAllCourses = async () => {
  const result = await pool.query(
    "SELECT * FROM courses INNER JOIN training ON courses.training_id = training.id"
  );
  return result.rows;
};

export const editCourse = async (id: string, modifiedCourse: newCourse) => {
  const isValidId = await pool.query("select * from courses where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query<newCourse>(
      " update courses set title_en= coalesce ($2,title_en ), title_ar = coalesce ($3,title_ar ) ,description_en = coalesce ($4,description_en) ,description_ar = coalesce($5,description_ar), target_audience_en= coalesce($6,target_audience_en), target_audience_ar= coalesce($7,target_audience_ar), delivery_method_en=coalesce($8,delivery_method_en), delivery_method_ar=coalesce($9,delivery_method_ar), duration= coalesce($10,duration), training_id= coalesce($11,training_id), starting_date= coalesce($12,starting_date) where id= $1 returning * ",
      [
        id,
        modifiedCourse.title_en,
        modifiedCourse.title_ar,
        modifiedCourse.description_en,
        modifiedCourse.description_ar,
        modifiedCourse.target_audience_en,
        modifiedCourse.target_audience_ar,
        modifiedCourse.delivery_method_en,
        modifiedCourse.delivery_method_ar,
        modifiedCourse.duration,
        modifiedCourse.training_id,
        modifiedCourse.starting_date,
      ]
    );
    return result.rows;
  }
};

export const deleteCoruse = async (id: string) => {
  const isValidId = await pool.query("select * from courses where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query("delete from courses where id=$1", [id]);
    return result.rows;
  }
};


export const getCourseById = async (id: string) => {
  const result = await pool.query<newCourse>("SELECT * FROM courses WHERE training_id=$1", [id]);
  return result.rows;
}
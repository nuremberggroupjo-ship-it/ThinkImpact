import pool from "../index";

export type newCategory = {
  id?: string;
  category_name_en: string;
  category_name_ar: string;
  description_en: string;
  description_ar: string;
  category_logo: string;
};
export const addNewGategory = async (newCategory: newCategory) => {
  const result = await pool.query<newCategory>(
    "insert into consulting (category_name_en, category_name_ar,description_en,description_ar,category_logo) values ($1,$2,$3,$4,$5) returning *",
    [
      newCategory.category_name_en,
      newCategory.category_name_ar,
      newCategory.description_en,
      newCategory.description_ar,
      newCategory.category_logo,
    ]
  );

  return result.rows;
};

export const getAllcategories = async () => {
  const result = await pool.query("select * from consulting");
  return result.rows;
};

export const editCategory = async (
  id: string,
  modifiedCategory: newCategory
) => {
  const isValidId = await pool.query("select * from consulting where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query<newCategory>(
      " update consulting  set category_name_en= coalesce ($2,category_name_en ), category_name_ar = coalesce ($3,category_name_ar ) ,description_en = coalesce ($4,description_en) ,description_ar = coalesce($5,description_ar),category_logo= coalesce($6,category_logo) where id= $1 returning * ",
      [
        id,
        modifiedCategory.category_name_en,
        modifiedCategory.category_name_ar,
        modifiedCategory.description_en,
        modifiedCategory.description_ar,
        modifiedCategory.category_logo,
      ]
    );
    return result.rows;
  }
};

export const deleteCategory = async (id: string) => {
  const isValidId = await pool.query("select * from consulting where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query("delete from consulting where id=$1", [id]);
    return result.rows;
  }
};

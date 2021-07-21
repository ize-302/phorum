import jwt from "jsonwebtoken";

export function verifyToken(jwtToken: string) {
  try {
    var token = jwtToken.replace("Bearer ", "");
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

export const generateSlug = (title: string) => {
  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\u0100-\uFFFF\w\-]/g, "-") // Remove all non-word chars ( fix for UTF-8 chars )
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

// PAGINATION UTISL
const customLabels = {
  totalDocs: "total_items",
  docs: "items",
  limit: "per_page",
  page: "page",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "page_count",
  pagingCounter: "slNo",
  meta: "paginator",
};

export const paginationOptions = async (per_page: any, page: any) => {
  return {
    limit: per_page,
    page: page,
    allowDiskUse: true,
    customLabels: customLabels,
    lean: false,
  };
};

// validate email
export const validateEmail = (mail: string) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

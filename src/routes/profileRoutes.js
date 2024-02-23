import axios from "axios";
import { Nodeapi } from "../config/serverUrl";

export const FetchDetails = async (id, table) => {
  try {
    const res = await axios.post(`${Nodeapi}/fetchdetails`, {
      id: id,
      table: table,
    });

    if (res.data) {
      if (res.data.code == 200) {
        return res.data.data.response;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const ContactInformation = async (id) => {
  try {
    const res = await axios.post(`${Nodeapi}/fetchContactInformation`, {
      id: id,
    });

    if (res.data) {
      if (res.data.code == 200) {
        return res.data.data.response;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const AddContactForm = async (ContactForm) => {
  try {
    const res = await axios.post(`${Nodeapi}/contactinformation`, ContactForm);
    if (res.data) {
      if (res.data.code == 200) {
        return res;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const UpdateContactForm = async (ContactForm) => {
  try {
    const res = await axios.post(`${Nodeapi}/updateContact`, ContactForm);
    if (res.data) {
      if (res.data.code == 200) {
        return res;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const AddDetails = async (ContactForm) => {
  try {
    const res = await axios.post(`${Nodeapi}/addDetails`, ContactForm);
    if (res.data) {
      if (res.data.code == 200) {
        return res;
      } else {
        return "Error Inserting Data";
      }
    }
  } catch (error) {
    return "Error Inserting Data";
  }
};

export const UpdateDetails = async (ContactForm) => {
  try {
    const res = await axios.post(`${Nodeapi}/updateDetails`, ContactForm);
    if (res.data) {
      if (res.data.code == 200) {
        return res;
      } else {
        return res;
      }
    }
  } catch (error) {
    return "Error Updateing Data";
  }
};

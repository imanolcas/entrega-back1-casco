import Cart from "../models/cart.model.js";

class CartsMongoManager {
  async create(data) {
    try {
      const one = await Cart.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readAll() {
    try {
      const all = await Cart.find();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async read(uid) {
    try {
      const one = await Cart.findOne({user_id: uid});
      return one;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(cid, data) {
    try {
      const opts = { new: true };
      const one = await Cart.findByIdAndUpdate(cid, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async delete(cid) {
    try {
      const one = await Cart.findByIdAndDelete(cid);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const cartsMongoManager = new CartsMongoManager();
export default cartsMongoManager;

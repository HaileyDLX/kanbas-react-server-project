import moduleModel from "./model.js";
export const findModuleByCid = (cid) => moduleModel.find({ course: cid });
export const createModule = (moduleData, cid) => {

    const moduleToCreate = { ...moduleData, course: cid };
    return moduleModel.create(moduleToCreate);
};
export const updateModule = (id, module) =>
    moduleModel.updateOne({ _id: id }, { $set: module });
export const deleteModule = (id) => moduleModel.deleteOne({ _id: id });
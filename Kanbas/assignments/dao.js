
import assignmentModel from "./model.js";
export const findAssignmentByCid = (cid) => assignmentModel.find({ course: cid });
export const findAssignmentById = (aid) => assignmentModel.find(id);
export const createAssignment = (assignmentData, cid) => {

    const assignmentToCreate = { ...assignmentData, course: cid };
    return assignmentModel.create(assignmentToCreate);
};
export const updateAssignment = (id, assignment) =>
    assignmentModel.updateOne({ _id: id }, { $set: assignment });
export const deleteAssignment = (id) => assignmentModel.deleteOne({ _id: id });

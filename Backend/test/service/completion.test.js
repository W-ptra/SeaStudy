const completionModel = require("../model/completionModel");
const { getTopicById } = require("../model/topicModel");
const createNewCompletion = require("./completion");

jest.mock("../model/completionModel");
jest.mock("../model/topicModel");

describe("createNewCompletion", () => {
    it("should return the result of completionModel.createNewCompletion", async () => {
        const newCompletion = { topicId: 1 };
        const topic = { id: 1, data: "topic data" };
        const expectedResult = { operation: true, status: 200, message: "Success" };

        getTopicById.mockResolvedValue(topic);
        completionModel.createNewCompletion.mockResolvedValue(expectedResult);

        const result = await createNewCompletion(newCompletion);

        expect(getTopicById).toHaveBeenCalledWith(newCompletion.topicId);
        expect(completionModel.createNewCompletion).toHaveBeenCalledWith(newCompletion);
        expect(result).toEqual(expectedResult);
    });

    it("should return an error if the topic is not found", async () => {
        const newCompletion = { topicId: 1 };
        const topic = { id: 1, data: null };
        const expectedError = {
            operation: false,
            status: 400,
            message: `topic with id ${topic.id} was not found`,
        };

        getTopicById.mockResolvedValue(topic);

        const result = await createNewCompletion(newCompletion);

        expect(getTopicById).toHaveBeenCalledWith(newCompletion.topicId);
        expect(completionModel.createNewCompletion).not.toHaveBeenCalled();
        expect(result).toEqual(expectedError);
    });
});
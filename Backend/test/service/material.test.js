const material = require("../../model/materialModel");
const { updateMaterial } = require("../../service/material");

describe("updateMaterial", () => {
    it("should return an error if the material does not exist", async () => {
        const updateMaterialData = {
            id: 1,
            // Add other properties to update here
        };

        const result = await updateMaterial(updateMaterialData);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(404);
        expect(result.message).toBe(`Material with id ${updateMaterialData.id} was not found`);
    });

    it("should update the material if it exists", async () => {
        // Create a new material to update
        const newMaterial = {
            // Add properties for the new material here
        };
        const createdMaterial = await material.createNewMaterial(newMaterial);

        const updateMaterialData = {
            id: createdMaterial.id,
            // Add other properties to update here
        };

        const result = await updateMaterial(updateMaterialData);

        expect(result.operation).toBe(true);
        // Add other assertions here to verify the updated material
    });
});
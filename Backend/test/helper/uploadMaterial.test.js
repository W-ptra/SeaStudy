const { uploadMaterialToBlobStorage } = require("../../helper/uploadMaterial");

test("test upload material to cloud storage",async ()=>{
    const path = "./public/materials/"
    const material = "0b523a34-8359-4956-aa6e-6a32f3578981.jpeg";
    const upload = await uploadMaterialToBlobStorage(path + material,material);

    expect(upload).toContain(`https://seastudy.blob.core.windows.net/materials/seastudyMaterialContainer/${material}`)
})
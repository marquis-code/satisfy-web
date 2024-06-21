// import { ref } from "vue";
// import Swal from "sweetalert2";
// import mammoth from "mammoth";
// import { PDFDocument } from "pdf-lib";

// export const useTextSplitter = () => {
//   const slides = ref<{ text: string; color?: string }[]>([]);
//   const editingIndex = ref<number | null>(null);
//   const previousEditingIndex = ref<number | null>(null);
//   const editingText = ref<string>("");

//   const splitTextIntoSlides = (text: string) => {
//     const trimmedText = text.trim().replace(/\s+/g, " ");
//     const chunks = [];
//     for (let i = 0; i < trimmedText.length; i += 380) {
//       chunks.push(trimmedText.slice(i, i + 380).trim());
//     }
//     const newSlides = chunks.map((chunk) => ({ text: chunk }));
//     slides.value = [...slides.value, ...newSlides].slice(0, 25);
//     return newSlides; // Return the newly created slides
//   };

//   const removeSlide = (index: number) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Delete Slide.",
//       cancelButtonText: "Nah, Just kidding",
//     }).then((result) => {
//       if (result.value) {
//         slides.value.splice(index, 1);
//       } else {
//         Swal.fire("Cancelled", "Action was cancelled", "info");
//       }
//     });
//   };

//   const startEditing = (index: number) => {
//     console.log(index, 'index here')
//     previousEditingIndex.value = editingIndex.value !== null ? editingIndex.value : null;
//     editingIndex.value = index;
//     editingText.value = slides.value[index].text;
//   };

//   const saveEditing = () => {
//     if (editingIndex.value !== null) {
//       slides.value[editingIndex.value].text = editingText.value;
//       editingIndex.value = null;
//       editingText.value = "";
//     }
//   };

//   const cancelEditing = () => {
//     editingIndex.value = null;
//     editingText.value = "";
//   };

//   const readDocxFile = async (file: File): Promise<string> => {
//     const arrayBuffer = await file.arrayBuffer();
//     const result = await mammoth.extractRawText({ arrayBuffer });
//     return result.value;
//   };

//   const readPdfFile = async (file: File): Promise<string> => {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(arrayBuffer);
//     const pages = pdfDoc.getPages();
//     let text = "";

//     for (const page of pages) {
//       const textContent = await page.getTextContent();
//       text += textContent.items.map((item) => item.str).join(" ") + "\n";
//     }

//     return text;
//   };

//   const uploadFile = async (file: File) => {
//     let text = "";
//     if (file.type === "application/pdf") {
//       text = await readPdfFile(file);
//     } else if (
//       file.type ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       text = await readDocxFile(file);
//     } else if (file.type === "text/plain") {
//       text = await file.text();
//     } else {
//       Swal.fire(
//         "Unsupported file type",
//         "Please upload a DOCX, PDF, or TXT file.",
//         "error"
//       );
//       return;
//     }
//     splitTextIntoSlides(text);
//   };

//   return {
//     slides,
//     splitTextIntoSlides,
//     removeSlide,
//     editingIndex,
//     previousEditingIndex,
//     editingText,
//     startEditing,
//     saveEditing,
//     cancelEditing,
//     uploadFile,
//   };
// };

import { ref } from "vue";
import Swal from "sweetalert2";
import mammoth from "mammoth";
import { PDFDocument } from "pdf-lib";
import wrap from "word-wrap";

export const useTextSplitter = () => {
  const slides = ref<{ text: string; color?: string }[]>([]);
  const editingIndex = ref<number | null>(null);
  const previousEditingIndex = ref<number | null>(null);
  const editingText = ref<string>("");

  const splitTextIntoSlides = (text: string) => {
    const wrappedText = wrap(text, { width: 380, cut: false, trim: true });
    const chunks = wrappedText.split('\n').filter(chunk => chunk.length > 0);

    const newSlides = chunks.map((chunk) => ({ text: chunk }));
    slides.value = [...slides.value, ...newSlides].slice(0, 25);
    return newSlides;
  };

  const removeSlide = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Slide.",
      cancelButtonText: "Nah, Just kidding",
    }).then((result) => {
      if (result.value) {
        slides.value.splice(index, 1);
      } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
      }
    });
  };

  const startEditing = (index: number) => {
    previousEditingIndex.value = editingIndex.value !== null ? editingIndex.value : null;
    editingIndex.value = index;
    editingText.value = slides.value[index].text;
  };

  const saveEditing = () => {
    if (editingIndex.value !== null) {
      slides.value[editingIndex.value].text = editingText.value;
      editingIndex.value = null;
      editingText.value = "";
    }
  };

  const cancelEditing = () => {
    editingIndex.value = null;
    editingText.value = "";
  };

  const readDocxFile = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const readPdfFile = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let text = "";

    for (const page of pages) {
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(" ") + "\n";
    }

    return text;
  };

  const uploadFile = async (file: File) => {
    let text = "";
    if (file.type === "application/pdf") {
      text = await readPdfFile(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await readDocxFile(file);
    } else if (file.type === "text/plain") {
      text = await file.text();
    } else {
      Swal.fire(
        "Unsupported file type",
        "Please upload a DOCX, PDF, or TXT file.",
        "error"
      );
      return;
    }
    splitTextIntoSlides(text);
  };

  return {
    slides,
    splitTextIntoSlides,
    removeSlide,
    editingIndex,
    previousEditingIndex,
    editingText,
    startEditing,
    saveEditing,
    cancelEditing,
    uploadFile,
  };
};
export interface DiagnosisResult {
  plant: string;
  disease: string;
  confidence: number;
  status: "healthy" | "infected" | "critical";
  description: string;
  cure: string;
  prevention: string;
  careTips: string;
}

const diseases: DiagnosisResult[] = [
  {
    plant: "Tomato",
    disease: "Early Blight",
    confidence: 96,
    status: "infected",
    description: "Early blight is caused by the fungus Alternaria solani. It produces dark, concentric spots on older leaves, which eventually yellow and drop. The disease can also affect stems and fruit.",
    cure: "Apply fungicides such as chlorothalonil or copper-based sprays. Remove and destroy infected plant debris.",
    prevention: "Avoid overhead watering and maintain good air circulation. Rotate crops and use disease-resistant varieties.",
    careTips: "Remove infected leaves promptly. Maintain proper soil nutrition with balanced fertilizer. Mulch around plants to prevent soil splash.",
  },
  {
    plant: "Potato",
    disease: "Late Blight",
    confidence: 92,
    status: "critical",
    description: "Late blight, caused by Phytophthora infestans, creates water-soaked lesions that rapidly enlarge and turn brown-black. White mold may appear on leaf undersides in humid conditions.",
    cure: "Apply systemic fungicides containing mefenoxam or chlorothalonil immediately. Remove and destroy all infected plant material.",
    prevention: "Plant certified disease-free seed potatoes. Ensure adequate spacing for airflow. Avoid irrigation late in the day.",
    careTips: "Monitor weather conditions closely—cool, wet weather promotes spread. Hill soil around plants to protect tubers from spore wash.",
  },
  {
    plant: "Apple",
    disease: "Apple Scab",
    confidence: 89,
    status: "infected",
    description: "Apple scab is caused by the fungus Venturia inaequalis. It creates olive-green to black lesions on leaves and fruit, leading to premature leaf drop and unmarketable fruit.",
    cure: "Apply fungicide sprays (captan or myclobutanil) beginning at green tip stage through petal fall.",
    prevention: "Rake and destroy fallen leaves in autumn. Plant scab-resistant varieties. Prune trees to improve air circulation.",
    careTips: "Maintain a regular spray schedule during wet spring weather. Thin fruit to reduce humidity within the canopy.",
  },
  {
    plant: "Grape",
    disease: "Black Rot",
    confidence: 94,
    status: "infected",
    description: "Black rot, caused by Guignardia bidwellii, produces reddish-brown leaf spots and causes berries to shrivel into hard, black mummies.",
    cure: "Apply fungicides (mancozeb or myclobutanil) from bud break through four weeks after bloom.",
    prevention: "Remove mummified berries and infected canes during dormant pruning. Maintain open canopy for air circulation.",
    careTips: "Train vines properly and remove excess growth. Ensure good drainage around the vineyard.",
  },
  {
    plant: "Corn",
    disease: "Northern Leaf Blight",
    confidence: 91,
    status: "infected",
    description: "Caused by Exserohilum turcicum, this disease creates long, cigar-shaped grayish-green lesions on corn leaves, reducing photosynthetic area and yield.",
    cure: "Apply foliar fungicides containing azoxystrobin or propiconazole at disease onset.",
    prevention: "Plant resistant hybrids. Practice crop rotation with non-host crops. Till infected residue after harvest.",
    careTips: "Scout fields regularly beginning at V8 growth stage. Ensure adequate plant nutrition to support disease tolerance.",
  },
];

export function getRandomDiagnosis(): DiagnosisResult {
  return diseases[Math.floor(Math.random() * diseases.length)];
}

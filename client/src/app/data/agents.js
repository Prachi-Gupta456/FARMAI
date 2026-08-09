import {
  Bug,
  Building2,
  CloudSun, Droplets,
  FlaskConical, Landmark, LineChart, LucideLineChart, ScanSearch, Sprout,
  SquareDashedMousePointer,
  TrendingUp,
 
} from "lucide-react"

export const CARDS = [
    { "name": " Disease Scan", "desc": "Photo Diagnosis", "icon": ScanSearch, "url": "disease-scan" },
    { "name": "Weather", "desc": "Forecast & alerts", "icon": CloudSun, "url": "weather" },
    { "name": "Irrigation", "desc": "Water timing", "icon": Droplets, "url": "irrigation" },
    { "name": "Fertilizer", "desc": "NPK guidance", "icon": FlaskConical, "url": "fertilizer" },
    { "name": "Pest", "desc": "Early warning", "icon": Bug, "url": "pest" },
    { "name": "Crop Advice", "desc": "Best next step", "icon": SquareDashedMousePointer, "url": "crop-advice" },
    { "name": "Market Prices", "desc": "Sell smarter", "icon": TrendingUp, "url": "market" },
    { "name": "Govt Schemes", "desc": "Benefits & support", "icon": Building2, "url": "govt-schemes" }
  ]

export const CAPABILITIES = [
  { icon: ScanSearch, title: "Disease Detection", desc: "Photograph any crop issue" },
  { icon: CloudSun, title: "Weather Advice", desc: "Localized daily guidance" },
  { icon: Droplets, title: "Irrigation Planning", desc: "Know when to water" },
  { icon: FlaskConical, title: "Fertilizer Guide", desc: "Right dose, right time" },
  { icon: Bug, title: "Pest Management", desc: "Identify & control safely" },
  { icon: LucideLineChart, title: "Market Prices", desc: "Sell at the right moment" },
  { icon: Sprout, title: "Crop Recommendation", desc: "Best crop for your land" },
  { icon: Landmark, title: "Government Schemes", desc: "Benefits you qualify for" },
]




import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

// This data represents different properties of polyurethane products
// Normally this would come from an API, but for demo purposes it's hardcoded
const PRODUCT_DATA = {
  'thermal': [
    { name: 'ProFoam', value: 6.5, unit: 'R-value per inch' },
    { name: 'RigidCore', value: 7.2, unit: 'R-value per inch' },
    { name: 'FlexCoat', value: 4.8, unit: 'R-value per inch' }
  ],
  'moisture': [
    { name: 'ProFoam', value: 0.8, unit: 'Perm rating' },
    { name: 'RigidCore', value: 0.5, unit: 'Perm rating' },
    { name: 'FlexCoat', value: 1.2, unit: 'Perm rating' }
  ],
  'strength': [
    { name: 'ProFoam', value: 25, unit: 'PSI' },
    { name: 'RigidCore', value: 120, unit: 'PSI' },
    { name: 'FlexCoat', value: 15, unit: 'PSI' }
  ],
  'lifespan': [
    { name: 'ProFoam', value: 50, unit: 'Years' },
    { name: 'RigidCore', value: 75, unit: 'Years' },
    { name: 'FlexCoat', value: 30, unit: 'Years' }
  ],
  'eco': [
    { name: 'ProFoam', value: 85, unit: '%' },
    { name: 'RigidCore', value: 70, unit: '%' },
    { name: 'FlexCoat', value: 95, unit: '%' }
  ]
};

// Radar chart data
const RADAR_DATA = [
  {
    subject: 'Thermal Insulation',
    ProFoam: 65,
    RigidCore: 72,
    FlexCoat: 48,
    fullMark: 100,
  },
  {
    subject: 'Moisture Resistance',
    ProFoam: 80,
    RigidCore: 95,
    FlexCoat: 60,
    fullMark: 100,
  },
  {
    subject: 'Structural Strength',
    ProFoam: 45,
    RigidCore: 90,
    FlexCoat: 30,
    fullMark: 100,
  },
  {
    subject: 'Flexibility',
    ProFoam: 30,
    RigidCore: 15,
    FlexCoat: 95,
    fullMark: 100,
  },
  {
    subject: 'Chemical Resistance',
    ProFoam: 75,
    RigidCore: 85,
    FlexCoat: 90,
    fullMark: 100,
  },
  {
    subject: 'Eco-Friendliness',
    ProFoam: 85,
    RigidCore: 70,
    FlexCoat: 95,
    fullMark: 100,
  },
];

// Custom tooltip for bar chart
const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-primary">{`${payload[0].value} ${unit}`}</p>
      </div>
    );
  }
  return null;
};

// Generate cost calculation data based on slider inputs
const generateCostData = (area: number, thickness: number) => {
  // Cost per square foot at 1 inch thickness
  const baseCost = {
    ProFoam: 1.75,
    RigidCore: 2.25,
    FlexCoat: 1.95
  };
  
  // Calculate total costs
  return [
    {
      name: 'ProFoam',
      cost: Math.round(area * baseCost.ProFoam * thickness * 100) / 100,
      savings: Math.round(area * 0.15 * 12 * (6.5 * thickness) * 100) / 100 // Annual energy savings
    },
    {
      name: 'RigidCore',
      cost: Math.round(area * baseCost.RigidCore * thickness * 100) / 100,
      savings: Math.round(area * 0.15 * 12 * (7.2 * thickness) * 100) / 100
    },
    {
      name: 'FlexCoat',
      cost: Math.round(area * baseCost.FlexCoat * thickness * 100) / 100,
      savings: Math.round(area * 0.15 * 12 * (4.8 * thickness) * 100) / 100
    }
  ];
};

const InteractiveProductChart = () => {
  const [propertyType, setPropertyType] = useState('thermal');
  const [chartType, setChartType] = useState('bar');
  const [area, setArea] = useState([1000]); // Square feet
  const [thickness, setThickness] = useState([2]); // Inches
  const [costData, setCostData] = useState(generateCostData(1000, 2));
  
  const handleAreaChange = (value: number[]) => {
    setArea(value);
    setCostData(generateCostData(value[0], thickness[0]));
  };
  
  const handleThicknessChange = (value: number[]) => {
    setThickness(value);
    setCostData(generateCostData(area[0], value[0]));
  };
  
  // Colors for the different products
  const barColors = {
    ProFoam: '#ff9a00',
    RigidCore: '#333333',
    FlexCoat: '#00a8e8'
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8"
      variants={fadeIn('up', 'tween', 0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ position: 'relative' }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Interactive Product Analyzer</h2>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 sm:mb-6 text-[10px] xs:text-xs sm:text-sm">
          <TabsTrigger value="performance" className="px-1 sm:px-2">Performance</TabsTrigger>
          <TabsTrigger value="radar" className="px-1 sm:px-2">Property Radar</TabsTrigger>
          <TabsTrigger value="cost" className="px-1 sm:px-2">Cost Calculator</TabsTrigger>
        </TabsList>
        
        {/* Performance Comparison Tab */}
        <TabsContent value="performance" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div style={{ position: 'relative' }}>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Select Property</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="text-xs sm:text-sm h-8 sm:h-10">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="thermal" className="text-xs sm:text-sm">Thermal Insulation</SelectItem>
                    <SelectItem value="moisture" className="text-xs sm:text-sm">Moisture Resistance</SelectItem>
                    <SelectItem value="strength" className="text-xs sm:text-sm">Structural Strength</SelectItem>
                    <SelectItem value="lifespan" className="text-xs sm:text-sm">Expected Lifespan</SelectItem>
                    <SelectItem value="eco" className="text-xs sm:text-sm">Eco-Friendliness</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div style={{ position: 'relative' }}>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="text-xs sm:text-sm h-8 sm:h-10">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="bar" className="text-xs sm:text-sm">Bar Chart</SelectItem>
                    <SelectItem value="horizontal" className="text-xs sm:text-sm">Horizontal Bar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-80 w-full relative" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
              {chartType === 'bar' ? (
                <BarChart
                  data={PRODUCT_DATA[propertyType as keyof typeof PRODUCT_DATA]}
                  margin={{ top: 10, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  />
                  <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                  <Tooltip content={<CustomTooltip unit={PRODUCT_DATA[propertyType as keyof typeof PRODUCT_DATA][0].unit} />} />
                  <Legend 
                    wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#ff9a00" 
                    name={`${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Value`}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <BarChart
                  layout="vertical"
                  data={PRODUCT_DATA[propertyType as keyof typeof PRODUCT_DATA]}
                  margin={{ top: 10, right: 5, left: window.innerWidth < 640 ? 40 : 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number"
                    tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  />
                  <Tooltip content={<CustomTooltip unit={PRODUCT_DATA[propertyType as keyof typeof PRODUCT_DATA][0].unit} />} />
                  <Legend 
                    wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#ff9a00" 
                    name={`${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Value`}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm" style={{ position: 'relative' }}>
            <h3 className="font-semibold mb-1 sm:mb-2">Understanding This Data</h3>
            <p className="mb-1 sm:mb-2">This chart shows comparative {propertyType} properties of our three main polyurethane product lines.</p>
            <p>Higher values indicate better performance. Contact our team for specific application recommendations.</p>
          </div>
        </TabsContent>
        
        {/* Radar Chart Tab */}
        <TabsContent value="radar" className="space-y-4 sm:space-y-6">
          <div className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-96 w-full relative" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
              <RadarChart 
                outerRadius={window.innerWidth < 640 ? 80 : 150} 
                width={600} 
                height={400} 
                data={RADAR_DATA}
              >
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: window.innerWidth < 640 ? 8 : 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fontSize: window.innerWidth < 640 ? 8 : 12 }}
                />
                <Radar name="ProFoam" dataKey="ProFoam" stroke="#ff9a00" fill="#ff9a00" fillOpacity={0.6} />
                <Radar name="RigidCore" dataKey="RigidCore" stroke="#333333" fill="#333333" fillOpacity={0.6} />
                <Radar name="FlexCoat" dataKey="FlexCoat" stroke="#00a8e8" fill="#00a8e8" fillOpacity={0.6} />
                <Legend wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
            <h3 className="font-semibold mb-1 sm:mb-2">Reading the Radar Chart</h3>
            <p>This chart compares products across six performance metrics. The further from center, the better the performance.</p>
            <p className="mt-1 sm:mt-2">Each product has optimal use cases based on these characteristics.</p>
          </div>
        </TabsContent>
        
        {/* Cost Calculator Tab */}
        <TabsContent value="cost" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div style={{ position: 'relative' }}>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                Project Area (square feet): {area[0]}
              </label>
              <Slider
                defaultValue={[1000]}
                max={5000}
                min={100}
                step={100}
                value={area}
                onValueChange={handleAreaChange}
                className="py-2 sm:py-4"
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                Material Thickness (inches): {thickness[0]}
              </label>
              <Slider
                defaultValue={[2]}
                max={6}
                min={1}
                step={0.5}
                value={thickness}
                onValueChange={handleThicknessChange}
                className="py-2 sm:py-4"
              />
            </div>
          </div>
          
          <div className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-80 w-full relative" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
              <BarChart
                data={costData}
                margin={{ top: 10, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                />
                <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                <Tooltip />
                <Legend 
                  wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  layout={window.innerWidth < 640 ? "horizontal" : "vertical"}
                  verticalAlign={window.innerWidth < 640 ? "bottom" : "middle"}
                  align={window.innerWidth < 640 ? "center" : "right"}
                />
                <Bar dataKey="cost" name="Installation Cost ($)" fill="#333333" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" name="Annual Savings ($)" fill="#77dd77" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {costData.map((product) => (
              <div key={product.name} className="bg-gray-50 p-3 sm:p-4 rounded-lg" style={{ position: 'relative' }}>
                <h3 className="font-semibold text-base sm:text-lg text-primary">{product.name}</h3>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 text-xs sm:text-sm">
                  <div>Installation:</div>
                  <div className="font-semibold text-right">${product.cost.toLocaleString()}</div>
                  <div>Annual Savings:</div>
                  <div className="font-semibold text-right">${product.savings.toLocaleString()}</div>
                  <div>ROI (years):</div>
                  <div className="font-semibold text-right">{(product.cost / product.savings).toFixed(1)}</div>
                </div>
                <Button 
                  className="w-full mt-3 sm:mt-4 bg-primary hover:bg-primary/90 transition-colors text-xs sm:text-sm py-1.5 sm:py-2 h-auto"
                  onClick={() => window.alert(`Thank you for your interest in ${product.name}! Our team will contact you shortly with a detailed quote.`)}
                >
                  Request Quote
                </Button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm mt-2 sm:mt-4" style={{ position: 'relative' }}>
            <h3 className="font-semibold mb-1 sm:mb-2">Cost Calculation Details</h3>
            <p>Estimated costs include labor and materials. Energy savings calculated at $0.15/kWh and the R-value of each product.</p>
            <p className="mt-1 sm:mt-2">Contact our sales team for a detailed project quote.</p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default InteractiveProductChart;
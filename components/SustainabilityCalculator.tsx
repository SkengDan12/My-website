import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}`}
    </text>
  );
};

const SustainabilityCalculator = () => {
  // State for calculator inputs
  const [buildingArea, setBuildingArea] = useState<number>(1000);
  const [insulationType, setInsulationType] = useState<string>('spray-foam');
  const [thickness, setThickness] = useState<number>(4);
  const [years, setYears] = useState<number>(10);
  
  // Results state
  const [results, setResults] = useState({
    energySavings: 0,
    co2Reduction: 0,
    costSavings: 0,
    roi: 0,
    paybackPeriod: 0,
    materialSavings: 0
  });
  
  // Initial chart data
  const [pieData, setPieData] = useState<any[]>([
    { name: 'Energy', value: 35 },
    { name: 'Durability', value: 25 },
    { name: 'Emissions', value: 20 },
    { name: 'Materials', value: 20 }
  ]);
  const [lineData, setLineData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  
  // Colors for charts
  const COLORS = ['#ff9a00', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Calculate results whenever inputs change
  useEffect(() => {
    // R-value per inch for different insulation types
    const rValues = {
      'spray-foam': 6.5,
      'rigid-board': 5.0,
      'traditional': 3.5
    };
    
    // Calculate R-value based on thickness and type
    const rValue = rValues[insulationType as keyof typeof rValues] * thickness;
    
    // Energy savings calculation (kWh/year)
    const baselineEnergyUse = buildingArea * 15; // Baseline 15 kWh/sqft/year
    const improvedEnergyUse = baselineEnergyUse * (1 - (rValue / 40)); // Diminishing returns formula
    const annualEnergySavings = baselineEnergyUse - improvedEnergyUse;
    const totalEnergySavings = annualEnergySavings * years;
    
    // CO2 reduction (kg)
    const co2PerKwh = 0.4; // kg CO2 per kWh
    const annualCo2Reduction = annualEnergySavings * co2PerKwh;
    const totalCo2Reduction = annualCo2Reduction * years;
    
    // Cost calculations
    const energyCostPerKwh = 0.15; // $0.15 per kWh
    const annualCostSavings = annualEnergySavings * energyCostPerKwh;
    const totalCostSavings = annualCostSavings * years;
    
    // Installation costs
    const installationCostPerSqft = {
      'spray-foam': 2.0,
      'rigid-board': 1.5,
      'traditional': 1.0
    };
    
    const initialCost = buildingArea * installationCostPerSqft[insulationType as keyof typeof installationCostPerSqft] * thickness;
    
    // ROI and payback period
    const roi = (totalCostSavings / initialCost) * 100;
    const paybackPeriod = initialCost / annualCostSavings;
    
    // Material comparisons (comparing to traditional materials)
    const traditionalMaterialWeight = buildingArea * 0.5; // lbs per sqft
    const newMaterialWeight = buildingArea * (insulationType === 'spray-foam' ? 0.3 : 0.4); // lbs per sqft
    const materialSavings = (1 - (newMaterialWeight / traditionalMaterialWeight)) * 100;
    
    // Update results
    setResults({
      energySavings: totalEnergySavings,
      co2Reduction: totalCo2Reduction,
      costSavings: totalCostSavings,
      roi: roi,
      paybackPeriod: paybackPeriod,
      materialSavings: materialSavings
    });
    
    // Update pie chart data
    setPieData([
      { name: 'Energy', value: 35 },
      { name: 'Durability', value: 25 },
      { name: 'Emissions', value: 20 },
      { name: 'Materials', value: 20 }
    ]);
    
    // Update line chart data (yearly savings)
    const newLineData = [];
    for (let i = 1; i <= Math.min(years, 20); i++) {
      newLineData.push({
        year: i,
        energy: annualEnergySavings * i,
        cost: annualCostSavings * i,
        co2: annualCo2Reduction * i
      });
    }
    setLineData(newLineData);
    
    // Update bar chart data (comparison with other materials)
    setBarData([
      {
        name: 'R-Value',
        'Danny\'s Foam': rValues['spray-foam'],
        'Rigid Board': rValues['rigid-board'],
        'Traditional': rValues['traditional'],
      },
      {
        name: 'Lifespan (Years)',
        'Danny\'s Foam': 50,
        'Rigid Board': 30,
        'Traditional': 15,
      },
      {
        name: 'Air Sealing',
        'Danny\'s Foam': 95,
        'Rigid Board': 70,
        'Traditional': 30,
      },
      {
        name: 'Moisture Resistance',
        'Danny\'s Foam': 90,
        'Rigid Board': 60,
        'Traditional': 20,
      }
    ]);
    
  }, [buildingArea, insulationType, thickness, years]);

  return (
    <section id="calculator" className="py-20 bg-gray-50" style={{ position: 'relative' }}>
      <div className="container-custom" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          style={{ position: 'relative' }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Interactive Tool
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Sustainability Impact Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the environmental and financial benefits of using Danny's advanced polyurethane products for your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8" style={{ position: 'relative' }}>
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6"
            style={{ position: 'relative' }}
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Project Parameters</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="building-area">Building Area (sq ft)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="building-area" 
                    type="number" 
                    value={buildingArea.toFixed(0)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      // Keep within valid range
                      if (value >= 100 && value <= 10000) {
                        setBuildingArea(parseInt(value.toString(), 10));
                      }
                    }}
                    onBlur={(e) => {
                      // Round to nearest 100 on blur for consistency with slider
                      const value = Number(e.target.value);
                      setBuildingArea(Math.round(value / 100) * 100);
                    }}
                    min={100}
                    max={10000}
                    step={100}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-600">sq ft</span>
                </div>
                <Slider 
                  value={[buildingArea]} 
                  onValueChange={(value) => {
                    // Calculate rounded value and set state
                    const rounded = Math.round(value[0] / 100) * 100;
                    setBuildingArea(rounded);
                  }}
                  min={100}
                  max={10000}
                  step={100}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Insulation Type</Label>
                <Tabs defaultValue="spray-foam" onValueChange={setInsulationType}>
                  <TabsList className="grid grid-cols-3 w-full text-xs sm:text-sm">
                    <TabsTrigger value="spray-foam">Spray Foam</TabsTrigger>
                    <TabsTrigger value="rigid-board">Rigid Board</TabsTrigger>
                    <TabsTrigger value="traditional">Traditional</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thickness">Thickness (inches)</Label>
                <div className="flex items-center gap-2 mb-2">
                  <Input 
                    id="thickness-input" 
                    type="number" 
                    value={thickness.toFixed(1)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      // Keep within valid range
                      if (value >= 1 && value <= 12) {
                        setThickness(parseFloat(value.toFixed(1)));
                      }
                    }}
                    onBlur={(e) => {
                      // Round to nearest 0.5 on blur for consistency with slider
                      const value = Number(e.target.value);
                      setThickness(Math.round(value * 2) / 2);
                    }}
                    min={1}
                    max={12}
                    step={0.5}
                    className="w-16"
                  />
                  <span className="text-sm text-gray-600">inches</span>
                </div>
                <Slider 
                  id="thickness"
                  value={[thickness]} 
                  onValueChange={(value) => {
                    // Round to nearest 0.5
                    const rounded = Math.round(value[0] * 2) / 2;
                    setThickness(rounded);
                  }}
                  min={1}
                  max={12}
                  step={0.5}
                  className="flex-1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="years">Timespan (years)</Label>
                <div className="flex items-center gap-2 mb-2">
                  <Input 
                    id="years-input" 
                    type="number" 
                    value={years.toFixed(0)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      // Keep within valid range
                      if (value >= 1 && value <= 50) {
                        setYears(parseInt(value.toString(), 10));
                      }
                    }}
                    onBlur={(e) => {
                      // Round to nearest integer on blur for consistency with slider
                      const value = Number(e.target.value);
                      setYears(Math.round(value));
                    }}
                    min={1}
                    max={50}
                    step={1}
                    className="w-16"
                  />
                  <span className="text-sm text-gray-600">years</span>
                </div>
                <Slider 
                  id="years"
                  value={[years]} 
                  onValueChange={(value) => {
                    // Always ensure we have clean integers for years
                    const rounded = Math.round(value[0]);
                    setYears(rounded);
                  }}
                  min={1}
                  max={50}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Results Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6" style={{ position: 'relative' }}>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
                  <CardTitle className="text-sm sm:text-base md:text-xl text-primary">Energy Savings</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">{Math.round(results.energySavings / 1000) * 1000} kWh</div>
                  <p className="text-xs sm:text-sm text-gray-500">Over {years} years</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
                  <CardTitle className="text-sm sm:text-base md:text-xl text-green-600">CO₂ Reduction</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">{Math.round(results.co2Reduction / 100) * 100} kg</div>
                  <p className="text-xs sm:text-sm text-gray-500">Carbon saved</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
                  <CardTitle className="text-sm sm:text-base md:text-xl text-blue-600">Cost Savings</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">${Math.round(results.costSavings / 100) * 100}</div>
                  <p className="text-xs sm:text-sm text-gray-500">Energy costs</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
                  <CardTitle className="text-sm sm:text-base md:text-xl text-purple-600">ROI</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">{Math.round(results.roi)}%</div>
                  <p className="text-xs sm:text-sm text-gray-500">Payback: {results.paybackPeriod.toFixed(1)} yrs</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Visualization Tabs */}
            <Card className="shadow-md">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Environmental Impact Visualization</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Interact with the charts to see detailed breakdown of benefits
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full mb-4 text-[10px] xs:text-xs sm:text-sm">
                    <TabsTrigger value="summary" className="px-1 sm:px-2">Impact Summary</TabsTrigger>
                    <TabsTrigger value="savings" className="px-1 sm:px-2">Savings Over Time</TabsTrigger>
                    <TabsTrigger value="comparison" className="px-1 sm:px-2">Material Comparison</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4 text-center">Sustainability Impact</h4>
                        <div className="h-[220px] sm:h-[280px] md:h-[300px] relative" style={{ position: 'relative' }}>
                          <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => 
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={window.innerWidth < 640 ? 60 : 80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value}%`, 'Impact']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4 text-center sm:text-left">Key Benefits</h4>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                          <li className="flex items-start">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary mt-1 mr-2 sm:mr-3 flex-shrink-0"></div>
                            <div>
                              <span className="font-medium">Energy Efficiency:</span> 50% better insulation than conventional materials.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#00C49F] mt-1 mr-2 sm:mr-3 flex-shrink-0"></div>
                            <div>
                              <span className="font-medium">Durability:</span> 3-4 times longer service life, reducing replacement waste.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FFBB28] mt-1 mr-2 sm:mr-3 flex-shrink-0"></div>
                            <div>
                              <span className="font-medium">Reduced Emissions:</span> 35% less carbon than conventional methods.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FF8042] mt-1 mr-2 sm:mr-3 flex-shrink-0"></div>
                            <div>
                              <span className="font-medium">Material Efficiency:</span> 40% recycled content, less material per sq ft.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="savings">
                    <div className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] relative" style={{ position: 'relative' }}>
                      <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
                        <AreaChart
                          data={lineData}
                          margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="year" 
                            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                            label={{ value: 'Years', position: 'insideBottomRight', offset: -5, fontSize: window.innerWidth < 640 ? 10 : 12 }} 
                          />
                          <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                          <Area type="monotone" dataKey="energy" stackId="1" stroke="#ff9a00" fill="#ff9a00" name="Energy Saved (kWh)" />
                          <Area type="monotone" dataKey="cost" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Cost Saved ($)" />
                          <Area type="monotone" dataKey="co2" stackId="3" stroke="#8884d8" fill="#8884d8" name="CO₂ Reduced (kg)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comparison">
                    <div className="h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] relative" style={{ position: 'relative' }}>
                      <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative' }}>
                        <BarChart
                          data={barData}
                          margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
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
                          <Bar dataKey="Danny's Foam" fill="#ff9a00" />
                          <Bar dataKey="Rigid Board" fill="#82ca9d" />
                          <Bar dataKey="Traditional" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4 border-t p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      window.alert("Your calculated results will be downloaded as a PDF report shortly.");
                    }}
                  >
                    Download Results
                  </button>
                  <button
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      window.alert("Thank you for your interest. A sustainability expert will contact you shortly to discuss your project needs.");
                    }}
                  >
                    Request Expert Assessment
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  * Calculations are based on industry standards and may vary based on specific project conditions.
                  Contact our engineering team for a detailed assessment of your project.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCalculator;
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { generateProductResponse, analyzeProductFeedback, generateComparisonAnalysis } from "./openai";

// Define contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10),
  privacyPolicy: z.boolean().refine(val => val === true),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate incoming data
      const formData = contactFormSchema.parse(req.body);
      
      // In a real app, you'd store this in a database, send an email, etc.
      // Here we just log it and return success
      console.log('Contact form submission:', formData);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid form data. Please check your inputs and try again.' 
      });
    }
  });

  // AI Assistant product query endpoint
  app.post('/api/ai/product-query', async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Invalid query. Please provide a question about our products.'
        });
      }
      
      const response = await generateProductResponse(query);
      
      return res.status(200).json({
        success: true,
        response
      });
    } catch (error) {
      console.error('AI product query error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error processing your request. Please try again later.'
      });
    }
  });
  
  // Product feedback analysis endpoint
  app.post('/api/ai/analyze-feedback', async (req, res) => {
    try {
      const { feedback } = req.body;
      
      if (!feedback || typeof feedback !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback. Please provide product feedback text.'
        });
      }
      
      const analysis = await analyzeProductFeedback(feedback);
      
      return res.status(200).json({
        success: true,
        analysis
      });
    } catch (error) {
      console.error('Feedback analysis error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error analyzing feedback. Please try again later.'
      });
    }
  });
  
  // Product comparison endpoint
  app.post('/api/ai/compare-products', async (req, res) => {
    try {
      const { productA, productB, applicationContext } = req.body;
      
      if (!productA || !productB || typeof productA !== 'string' || typeof productB !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Invalid product selection. Please select two products to compare.'
        });
      }
      
      const comparison = await generateComparisonAnalysis(productA, productB, applicationContext);
      
      return res.status(200).json({
        success: true,
        comparison
      });
    } catch (error) {
      console.error('Product comparison error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error comparing products. Please try again later.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

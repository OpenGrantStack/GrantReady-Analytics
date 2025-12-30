import { Router, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { GrantMetrics } from '../../metrics/GrantMetrics';
import { ComplianceMetrics } from '../../metrics/ComplianceMetrics';
import { OutcomeMetrics } from '../../metrics/OutcomeMetrics';
import { FinancialMetrics } from '../../metrics/FinancialMetrics';
import logger from '../../utils/logger';
import { requireAuth } from '../middleware/validation';

const router = Router();
const grantMetrics = new GrantMetrics();
const complianceMetrics = new ComplianceMetrics();
const outcomeMetrics = new OutcomeMetrics();
const financialMetrics = new FinancialMetrics();

/**
 * @swagger
 * /api/v1/metrics/grants/{grantId}/progress:
 *   get:
 *     summary: Get progress metrics for a grant
 *     description: Returns comprehensive progress metrics including timeline, financial, and milestone progress
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: grantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Grant identifier
 *       - in: query
 *         name: includeDetails
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include detailed breakdowns
 *     responses:
 *       200:
 *         description: Progress metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrantProgressMetrics'
 *       404:
 *         description: Grant not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/grants/:grantId/progress',
  requireAuth,
  [
    param('grantId').isUUID().withMessage('Valid grant ID required'),
    query('includeDetails').optional().isBoolean(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { grantId } = req.params;
      const includeDetails = req.query.includeDetails === 'true';
      
      // In a real implementation, this would fetch grant data from database
      // For now, return sample metrics
      const metrics = await grantMetrics.calculateProgress({
        id: grantId,
        totalFunding: 1500000,
        expenditures: [],
        milestones: [],
        kpis: [],
        status: 'active',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2026-03-31'),
      } as any);
      
      const response: any = {
        success: true,
        data: metrics,
        timestamp: new Date().toISOString(),
      };
      
      if (includeDetails) {
        response.details = await grantMetrics.generateProgressReport(grantId);
      }
      
      res.json(response);
    } catch (error) {
      logger.error('Error fetching progress metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch progress metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * @swagger
 * /api/v1/metrics/grants/{grantId}/compliance:
 *   get:
 *     summary: Get compliance metrics for a grant
 *     description: Returns compliance status and detailed requirement assessments
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: grantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Grant identifier
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [summary, detailed, report]
 *           default: summary
 *         description: Output format
 *     responses:
 *       200:
 *         description: Compliance metrics retrieved successfully
 *       404:
 *         description: Grant not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/grants/:grantId/compliance',
  requireAuth,
  [
    param('grantId').isUUID().withMessage('Valid grant ID required'),
    query('format').optional().isIn(['summary', 'detailed', 'report']),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { grantId } = req.params;
      const format = req.query.format || 'summary';
      
      // In a real implementation, fetch compliance data
      const complianceSummary = await complianceMetrics.assessCompliance(
        { id: grantId } as any,
        []
      );
      
      let response: any = {
        success: true,
        data: complianceSummary,
        timestamp: new Date().toISOString(),
      };
      
      if (format === 'report') {
        const report = await complianceMetrics.generateComplianceReport(grantId);
        response.report = report;
      }
      
      res.json(response);
    } catch (error) {
      logger.error('Error fetching compliance metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch compliance metrics',
      });
    }
  }
);

/**
 * @swagger
 * /api/v1/metrics/grants/{grantId}/financial:
 *   get:
 *     summary: Get financial metrics for a grant
 *     description: Returns financial performance metrics including utilization, burn rate, and forecasts
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: grantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Grant identifier
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [monthly, quarterly, annual]
 *           default: quarterly
 *         description: Reporting period
 *     responses:
 *       200:
 *         description: Financial metrics retrieved successfully
 *       404:
 *         description: Grant not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/grants/:grantId/financial',
  requireAuth,
  [
    param('grantId').isUUID().withMessage('Valid grant ID required'),
    query('period').optional().isIn(['monthly', 'quarterly', 'annual']),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { grantId } = req.params;
      const period = (req.query.period as string) || 'quarterly';
      
      const financialMetricsData = await financialMetrics.calculateMetrics(grantId, period);
      
      res.json({
        success: true,
        data: financialMetricsData,
        period,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching financial metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch financial metrics',
      });
    }
  }
);

/**
 * @swagger
 * /api/v1/metrics/portfolio/{portfolioId}:
 *   get:
 *     summary: Get aggregated metrics for a portfolio
 *     description: Returns aggregated metrics across all grants in a portfolio
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio identifier
 *       - in: query
 *         name: metrics
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [progress, compliance, financial, outcomes]
 *         description: Specific metrics to include
 *     responses:
 *       200:
 *         description: Portfolio metrics retrieved successfully
 *       404:
 *         description: Portfolio not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/portfolio/:portfolioId',
  requireAuth,
  [
    param('portfolioId').isUUID().withMessage('Valid portfolio ID required'),
    query('metrics').optional().isArray(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { portfolioId } = req.params;
      const requestedMetrics = req.query.metrics || ['progress', 'compliance', 'financial', 'outcomes'];
      
      // In a real implementation, aggregate metrics across portfolio grants
      const portfolioMetrics = {
        portfolioId,
        totalGrants: 15,
        activeGrants: 12,
        totalFunding: 25000000,
        utilizedFunding: 8500000,
        averageProgress: 0.65,
        complianceRate: 0.88,
        atRiskGrants: 3,
        highRiskGrants: 1,
        upcomingDeadlines: [
          { grantId: 'GR-2023-001', deadline: '2024-03-31', type: 'quarterly-report' },
          { grantId: 'GR-2023-002', deadline: '2024-03-15', type: 'financial-statement' },
        ],
        topPerformers: ['GR-2023-001', 'GR-2023-005'],
        needAttention: ['GR-2023-008'],
      };
      
      res.json({
        success: true,
        data: portfolioMetrics,
        includedMetrics: requestedMetrics,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching portfolio metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch portfolio metrics',
      });
    }
  }
);

/**
 * @swagger
 * /api/v1/metrics/trends:
 *   get:
 *     summary: Get trend metrics
 *     description: Returns trend analysis for metrics over time
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: grantId
 *         schema:
 *           type: string
 *         description: Optional specific grant ID
 *       - in: query
 *         name: metricType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [progress, compliance, financial, outcomes]
 *         description: Type of metric to analyze
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 90d, 1y]
 *           default: 90d
 *         description: Timeframe for trend analysis
 *     responses:
 *       200:
 *         description: Trend metrics retrieved successfully
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/trends',
  requireAuth,
  [
    query('grantId').optional().isUUID(),
    query('metricType').isIn(['progress', 'compliance', 'financial', 'outcomes']),
    query('timeframe').optional().isIn(['7d', '30d', '90d', '1y']),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { grantId, metricType, timeframe = '90d' } = req.query;
      
      // Generate sample trend data
      const trendData = {
        metricType,
        timeframe,
        dataPoints: [
          { date: '2023-10-01', value: 0.55 },
          { date: '2023-11-01', value: 0.60 },
          { date: '2023-12-01', value: 0.65 },
          { date: '2024-01-01', value: 0.68 },
        ],
        trend: 'improving',
        trendStrength: 0.85,
        forecast: [
          { date: '2024-02-01', value: 0.72 },
          { date: '2024-03-01', value: 0.75 },
        ],
        insights: [
          'Consistent improvement over the past 90 days',
          'Current trajectory suggests target achievement by Q2 2024',
        ],
      };
      
      res.json({
        success: true,
        data: trendData,
        grantId: grantId || 'all',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching trend metrics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trend metrics',
      });
    }
  }
);

export default router;

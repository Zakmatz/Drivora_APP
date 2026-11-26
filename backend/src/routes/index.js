import { Router } from 'express';
import { asyncHandler as h } from '../middleware/asyncHandler.js';
import { health } from '../controllers/healthController.js';
import { listServices, getService } from '../controllers/servicesController.js';
import { listDrivers, getDriver, listDriverReviews } from '../controllers/driversController.js';
import { listReviews, createReview } from '../controllers/reviewsController.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

router.get('/health', health);

router.get('/services', h(listServices));
router.get('/services/:slug', h(getService));

router.get('/drivers', h(listDrivers));
router.get('/drivers/:slug', h(getDriver));
router.get('/drivers/:slug/reviews', h(listDriverReviews));

router.get('/reviews', h(listReviews));
router.post('/reviews', rateLimit({ windowMs: 10 * 60 * 1000, max: 5 }), h(createReview));

export default router;

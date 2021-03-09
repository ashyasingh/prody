const express = require('express');
const router = express.Router();
const multer = require('multer');

const authJwt = require('../auth/authJwt');

const registrationController = require('../controllers/registration');
const productController = require('../controllers/product');
const feedbackController = require('../controllers/feedback');
const opinionController = require('../controllers/opinion');
const shareController = require('../controllers/share');
const complaintController = require('../controllers/complaint');
const messageController = require('../controllers/message');
const reviewController = require('../controllers/review');
// const socialOpiniosAndReviewsController = require('../controllers/social_opinions_and_reviews');
const lastReviewsController = require('../controllers/last_reviews');
const productOpinionSummaryController = require('../controllers/prodcut_opinion_summary');
const userActivityController = require('../controllers/user_activity');
const productPicController = require('../controllers/productPic');
const reviewVideoController = require('../controllers/reviewVideo');
const productPageController = require('../controllers/productPage');
const brandPageController = require('../controllers/brandPage');

// const testController = require('../controllers/test') // for testing

// registration controller
router.post('/api/registration', registrationController.postRegistration);
router.get('/api/userinfobyuserid/:id', registrationController.getUserInfoByUserID);
router.get('/api/userinfobyfirebaseuid/:id', registrationController.getUserInfoByFirebaseUID);
router.post('/api/updateuserinfo/:id', registrationController.postUpdateUserInfo);

// router.get('/api/product/:barcode/:country/:user', productController.getProduct);
router.post('/api/product/', productController.getProduct);
router.post('/api/feedback', feedbackController.postFeedback);
router.post('/api/opinion', opinionController.postOpinion);
router.post('/api/share', shareController.postShare);
router.post('/api/message', messageController.postMessage);
router.post('/api/review', reviewController.postReview);
// router.get('/api/SocialOpiniosAndReviews/:id', socialOpiniosAndReviewsController.getSocialOpiniosAndReviews);
router.get('/api/lastreviews/', lastReviewsController.getLastReview);
router.get('/api/productOpinionSummary/', productOpinionSummaryController.getProductOpinionSummary);
router.get('/api/userActivity/:id', userActivityController.getUserActivity);
router.get('/api/productPic/:id', productPicController.getProductPic);

// complaint
router.get('/api/product_issues/:id', complaintController.getProductIssues);
router.get('/api/complaint_q/:issue_id', complaintController.getComplaintQ);


router.post('/api/complaint',  multer().any(), complaintController.postComplaint);
router.post('/api/reviewVideo', reviewVideoController.postReviewVideo);


// product page API
router.get('/api/product_page_countries', [authJwt.verifyToken], productPageController.getCountries);
router.get('/api/product_page_info/:id', [authJwt.verifyToken], productPageController.getProductPageInfo);
router.get('/api/product_page_nutrition/:id', [authJwt.verifyToken], productPageController.getProductPageNutrition);
router.get('/api/product_page_ingredients/:id', [authJwt.verifyToken], productPageController.getProductPageIngredients);
router.get('/api/product_page_tag/:country/:barcode', [authJwt.verifyToken], productPageController.getProductPageTag);
router.get('/api/product_page_score_and_better_products/:country/:barcode', [authJwt.verifyToken], productPageController.getProductPageScoreAndBetterProducts);
router.get('/api/product_page_product_dropdown/:country/:barcode', [authJwt.verifyToken], productPageController.getProductPageProductDropdown);
router.get('/api/product_page_adv/:country/:barcode', [authJwt.verifyToken], productPageController.getProductPageAdv);
router.get('/api/product_page_brand_products/:country/:brand', [authJwt.verifyToken], productPageController.getProductPageBrandProducts);

// brand page API
router.get('/api/brand_page_brand_dropdown/:brand', [authJwt.verifyToken], brandPageController.getBrandPageBrandDropdown);

module.exports = router;
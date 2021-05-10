import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id
      const review = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      )
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewID = req.body.review_id
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewID,
        req.body.user_id,
        text,
        date
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update review - user my not be original poster'
        )
      }

      res.json({ status: 'succes' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewID = req.query.id
      const userId = req.body.user_id

      console.log(reviewID)

      const reviewResponse = await ReviewsDAO.deleteReview(reviewID, userId)
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

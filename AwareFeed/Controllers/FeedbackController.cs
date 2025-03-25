using AwareFeed.Models;
using AwareFeed.Service;
using Microsoft.AspNetCore.Mvc;

namespace AwareFeed.Controllers
{
    [Route("feedback")]
    public class FeedbackController(IFeedbackService feedbackService) : Controller
    {
        private readonly IFeedbackService _feedbackService = feedbackService;

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("save")]
        public async Task<IActionResult> Feedback([FromBody] FeedbackItemDto request)
        {
            var result = await _feedbackService.Save(request);
            return Json(new { success = result });
        }

        [HttpGet("list")]
        public async Task<IActionResult> Feedbacks()
        {
            var result = await _feedbackService.Search();
            return View(result);
        }
    }
}

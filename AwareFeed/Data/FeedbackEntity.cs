
namespace AwareFeed.Models
{
    public class FeedbackEntity
    {
        public long Id { get; set; }
        public string ApplicationId { get; set; }
        public string? UserId { get; set; }
        public int Type { get; set; }
        public string Content { get; set; }
        public string Difficulties { get; set; }
        public int Rating { get; set; }
        public string Path { get; set; }
        public DateTime CreateDate { get; set; }
    }
}

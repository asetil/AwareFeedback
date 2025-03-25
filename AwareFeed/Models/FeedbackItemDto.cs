namespace AwareFeed.Models
{
    public class FeedbackItemDto
    {
        public string ApplicationId { get; set; }
        public string? UserId { get; set; }
        public int Type { get; set; }
        public string Content { get; set; }
        public string Difficulties { get; set; }
        public int Rating { get; set; }
        public string Path { get; set; }
    }
}

using AwareFeed.Data;
using AwareFeed.Models;

namespace AwareFeed.Service
{
    public interface IFeedbackService
    {
        Task<bool> Save(FeedbackItemDto model);
        Task<List<FeedbackItemDto>> Search(string applicationId = "");
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly FeedbackDbContext _context;

        public FeedbackService(FeedbackDbContext context)
        {
            _context = context;
        }

        public async Task<List<FeedbackItemDto>> Search(string applicationId = "")
        {
            var queryable = _context.Feedbacks.AsQueryable();
            if (!string.IsNullOrEmpty(applicationId))
                queryable = queryable.Where(x => x.ApplicationId == applicationId);

            var result = queryable.Select(s => new FeedbackItemDto()
            {
                ApplicationId = s.ApplicationId,
                Content = s.Content,
                Difficulties = s.Difficulties,
                Path = s.Path,
                Rating = s.Rating,
                Type = s.Type,
                UserId = s.UserId,
            }).ToList();

            return result;
        }

        public async Task<bool> Save(FeedbackItemDto model)
        {
            if (model == null)
                return false;

            if (string.IsNullOrWhiteSpace(model.Content))
                model.Content = "-";

            if (string.IsNullOrWhiteSpace(model.Difficulties))
                model.Difficulties = "-";

            var entity = new FeedbackEntity()
            {
                ApplicationId = model.ApplicationId,
                Content = model.Content,
                Type = model.Type,
                Difficulties = model.Difficulties,
                Rating = model.Rating,
                UserId = model.UserId,
                Path = model.Path,
                CreateDate = DateTime.UtcNow,
            };

            _context.Feedbacks.Add(entity);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

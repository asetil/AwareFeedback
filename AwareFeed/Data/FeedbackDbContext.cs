using AwareFeed.Models;
using Microsoft.EntityFrameworkCore;
namespace AwareFeed.Data;

public class FeedbackDbContext : DbContext
{
    public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options) : base(options) { }

    public DbSet<FeedbackEntity> Feedbacks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<FeedbackEntity>().HasKey(e => e.Id);
    }
}

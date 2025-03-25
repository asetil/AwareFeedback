using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwareFeed.Migrations
{
    /// <inheritdoc />
    public partial class feedbackpath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "Feedbacks",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Path",
                table: "Feedbacks");
        }
    }
}

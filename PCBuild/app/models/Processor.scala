package models

import play.api.db.slick.Config.driver.simple._

case class Processor(
                      id: Int,
                      imageURL: String,
                      manufacturer: String,
                      model: String,
                      socket: String,
                      nbCores: Int,
                      nbThreads: Int,
                      frequency: Float,
                      consumption: Float,
                      popularity: Int,
                      price: Float
                    )

/* Table mapping
 */
class ProcessorTable(tag: Tag) extends Table[Processor](tag, "PROCESSOR")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def model = column[String]("MODEL", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def socket = column[String]("SOCKET", O.NotNull)
  def nbCores = column[Int]("NB_CORES", O.NotNull)
  def nbThreads = column[Int]("NB_THREADS", O.NotNull)
  def frequency = column[Float]("FREQUENCY", O.NotNull)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageURL = column[String]("IMAGE_URL")


  def * = (id, imageURL, manufacturer, model, socket, nbCores, nbThreads, frequency, consumption, popularity, price) <> (Processor.tupled, Processor.unapply)
}
